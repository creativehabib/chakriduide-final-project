<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Http\Resources\MetaResource;
use App\Models\Blog;
use App\Models\Category;
use App\Repositories\BlogRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    protected BlogRepository $blogRepository;

    public function __construct(BlogRepository $blogRepository)
    {
        $this->blogRepository = $blogRepository;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $filters = (array) $request->only('search');
        $blog = $this->blogRepository->all($filters, 5);
        return Inertia::render('admin/blog/index', [
            'blogs' => BlogResource::collection($blog),
            'filters' => $filters,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/blog/create', [
            'categories' =>
                Category::select('id', 'name')->orderBy('name')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|max:255|unique:blogs,slug',
                'content' => 'required|string',
                'description' => 'nullable|string',
                'status' => 'required|in:draft,published,archived',
                'is_featured' => 'boolean',
                'media_id' => 'nullable|exists:media,id',
                'category_id' => 'required|exists:categories,id',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string',
                'og_img_id' => 'nullable|exists:media,id',
                'allow_comments' => 'boolean',
                'index' => 'boolean',
            ]);
            Cache::forget('blogs_with_meta_image'); // Clear cache for blog
            // Post তৈরি করুন
            $validated['user_id'] = auth()->id(); // Authenticated user ID
            $blog = $this->blogRepository->create($validated);

            // মেটা সেট করুন (Trait দিয়ে)
            $blog->setMetas([
                'meta_title' => $validated['meta_title'] ?? null,
                'meta_description' => $validated['meta_description'] ?? null,
                'meta_image_id' => $validated['og_img_id'] ?? null,
            ]);
            return redirect()->route('blog.posts.index')->with('success', 'Blog post created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $post)
    {
        $post->load(['category', 'media', 'metas','user']); // রিলেশন লোড হচ্ছে
        return Inertia::render('admin/blog/Edit', [
            'post' => new BlogResource($post),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $post)
    {
        $blog = $this->blogRepository->find($post->id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug,' . $post->id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'media_id' => 'nullable|exists:media,id',
            'og_img_id' => 'nullable|integer|exists:media,id',
            'allow_comments' => 'boolean',
            'index' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
        ]);

        $validated['user_id'] = auth()->id(); // Authenticated user ID
        $this->blogRepository->update($post, $validated);

        // ✅ Save meta data
        $post->setMetas([
            'meta_title' => $request->input('meta_title'),
            'meta_description' => $request->input('meta_description'),
            'meta_image_id' => $request->input('og_img_id'),
        ]);
        Cache::forget('blogs_with_meta_image'); // Clear cache for blogs
        return redirect()->route('blog.posts.index')->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $blog = $this->blogRepository->find($id);
            $blog->clearMetaCache(); // Clear meta cache before deletion
            $blog->metas()->delete(); // Delete related meta records
            $this->blogRepository->delete($blog); // Delete the blog post
            Cache::forget('blogs_with_meta_image'); // Clear cache for blogs
            return redirect()->route('blog.posts.index')->with('success', 'Blog post deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }


    public function upload(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max 2MB
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            // Generate a unique file name
            $fileName = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();

            // Store image in 'public/uploads' directory using the 'public' disk
            // This will save files to storage/app/public/uploads
            $path = $image->storeAs('uploads', $fileName, 'public');

            // Get the public URL for the stored image
            // This will return something like /storage/uploads/your_image.jpg
            $url = Storage::url($path);

            return response()->json(['url' => $url]);
        }

        return response()->json(['message' => 'No image file provided'], 400);
    }
}
