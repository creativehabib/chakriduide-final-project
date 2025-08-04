<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Http\Resources\MetaResource;
use App\Models\Blog;
use App\Models\QCategory;
use App\Repositories\BlogRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    protected BlogRepository $blogRepository;
    public function __construct(BlogRepository $blogRepository)
    {
        $this->blogRepository = $blogRepository;
    }
    public function index(Request $request)
    {
        $filters = $request->only('search');
        $blogs = $this->blogRepository->paginate($filters, 6);

        return Inertia::render('welcome', [
            'blogs' => BlogResource::collection($blogs),
            'filters' => $filters,
        ]);
    }

    public function singlePost($slug): Response
    {
        $blog = Blog::with(['media', 'metas', 'category', 'user'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
        $blogs = $this->blogRepository->paginate();
        $relatedBlogs = Blog::with('category','user', 'media')
        ->where('id', '!=', $blog->id)
            ->where('status', 'published')
            ->where('category_id', $blog->category_id)
            ->latest()
            ->take(5)
            ->get();
        return Inertia::render('frontend/blog/single', [
            'blog' => new BlogResource($blog),
            'blogs' => BlogResource::collection($blogs),
            'relatedBlogs' => BlogResource::collection($relatedBlogs),
            'meta' => new MetaResource($blog),
        ]);
    }

    // Clean URL JSON pagination
    public function listJson(Request $request, int $page = 1): JsonResponse
    {
        $filters = $request->only('search');

        // Manually set current page
        $request->merge(['page' => $page]);

        $blogs = $this->blogRepository->paginate($filters, 6);

        return response()->json($blogs);
    }

    // Question Category
    public function QCategory()
    {
        $categories = QCategory::withCount('questions')->get();

        return Inertia::render('frontend/question_category', [
            'categories' => $categories
        ]);
    }

    // নির্দিষ্ট ক্যাটাগরির প্রশ্ন দেখানোর জন্য নতুন মেথড
    public function showCategoryQuestions($slug)
    {
        $category = QCategory::where('slug', $slug)->firstOrFail();

        // ক্যাটাগরির সাথে সম্পর্কিত প্রশ্ন এবং প্রশ্নকারীর তথ্য লোড করা
        // 'options' রিলেশনশিপ সহ প্রশ্নগুলো লোড করা হয়েছে
        $questions = $category->questions()->with(['user', 'options'])->paginate(10);

        return Inertia::render('frontend/category_questions', [
            'category' => $category,
            'questions' => $questions,
        ]);
    }
}
