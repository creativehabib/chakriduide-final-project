<?php
namespace App\Repositories;
use App\Models\Blog;

class BlogRepository
{
    public function paginate(array $filters = [], int $perPage = 10)
    {
        return Blog::with(['category', 'media', 'metas', 'user'])
            ->filter($filters)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }
    public function all(array $filters = [])
    {
        return Blog::with(['category', 'media', 'metas', 'user'])
            ->filter($filters)
            ->latest()
            ->get();
    }

    /**
     * Find a blog by its ID.
     *
     * @param int $id
     * @return Blog|null
     */
    public function find(int $id): ?Blog
    {
        return Blog::with(['category', 'media', 'metas', 'user'])->findOrFail($id);
    }

    /**
     * Create a new blog.
     *
     * @param array $data
     * @return Blog
     */
    public function create(array $data): Blog
    {
        return Blog::create($data);
    }

    /**
     * Update an existing blog.
     *
     * @param Blog $blog
     * @param array $data
     * @return Blog
     */
    public function update(Blog $blog, array $data): Blog
    {
        $blog->update($data);
        return $blog;
    }

    /**
     * Delete a blog.
     *
     * @param Blog $blog
     * @return bool
     */
    public function delete(Blog $blog): bool
    {
        return $blog->delete();
    }

    public function getPaginatedBlogs(array $filters = [], int $perPage = 6)
    {
        return Blog::with(['category', 'media', 'metas', 'user'])
            ->where('status', 'published')
            ->filter($filters)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }
}
