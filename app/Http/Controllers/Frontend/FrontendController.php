<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use App\Repositories\BlogRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function show($slug)
    {
        $blog = Blog::with(['media', 'metas', 'category', 'user'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('frontend/blog/single', [
            'blog' => new BlogResource($blog),
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
}
