<?php
namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('admin/settings/edit', [
            'settings' => [
                'cache_blog_enabled' => Setting::get('cache_blog_enabled', '1'),
                'cache_blog_duration' => Setting::get('cache_blog_duration', '10'),
            ]
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'site_email' => 'nullable|email',
            'site_description' => 'nullable|string',
            'cache_blog_enabled' => 'required|in:0,1',
            'cache_blog_duration' => 'required|numeric|min:1',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Settings updated successfully.');
    }

    public function clearCache()
    {
        Cache::flush();
        return back()->with('success', 'All caches cleared.');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function check(Request $request): JsonResponse
    {
        $request->validate([
            'slug' => 'required|string|max:255',
            'table' => 'required|string',
            'ignore_id' => 'nullable|integer',
        ]);

        $query = DB::table($request->input('table'))
            ->where('slug', $request->input('slug'));

        // If ignore_id is provided, exclude it from the check
        if ($request->filled('ignore_id')) {
            $query->where('id', '!=', $request->input('ignore_id'));
        }
        $exists = $query->exists();

        return response()->json(['available' => !$exists]);
    }
}
