<?php
namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Setting;
use http\Env\Response;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

class SettingController extends Controller
{
    public function index()
    {
        $posts = Blog::where('status', 'published')->latest()->get();

        $content = view('sitemap', compact('posts'))->render();

        return response($content, 200)->header('Content-Type', 'application/xml');
    }
    public function edit()
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        return Inertia::render('admin/settings/edit', [
            'media' => [],
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'site_name' => 'nullable|string|max:255',
            'site_email' => 'nullable|email|max:255',
            'site_description' => 'nullable|string|max:1000',
            'cache_blog_enabled' => 'required|boolean',
            'cache_blog_duration' => 'required|integer|min:1|max:10080',

            'meta_title' => 'nullable|string|max:255',
            'site_keywords' => 'nullable|string|max:500',
            'og_image' => 'nullable|string|max:255',

            'header_script' => 'nullable|string',
            'footer_script' => 'nullable|string',

            'meta_pixel_id' => 'nullable|string|max:255',
            'google_analytics_id' => 'nullable|string|max:255',
            'google_adsense_id' => 'nullable|string|max:255',
            'adsense_auto_enabled' => 'required|boolean',
            'favicon' => 'nullable|string|max:255',
            'cookie_consent_text' => 'nullable|string|max:1000',
            'allow_registration' => 'required|boolean',
            'allow_indexing' => 'required|boolean',
            'site_logo' => 'nullable|string|max:255',
            'sitemap_include_posts' => 'nullable|boolean',
            'sitemap_include_categories' => 'nullable|boolean',
            'sitemap_include_pages' => 'nullable|boolean',

            'robots_txt' => 'nullable|string|max:5000',
        ]);

        foreach ($request->except(['_token', '_method']) as $key => $value) {
            Setting::set($key, $value);
        }

        // Optional: Handle og_image file upload
        if ($request->hasFile('og_image')) {
            $file = $request->file('og_image')->store('public/settings');
            Setting::set('og_image', str_replace('public/', 'storage/', $file));
        }

        return back()->with('success', 'Settings updated successfully!');
    }

    /**
     * Clear all caches.
     *
     * @return RedirectResponse
     */
    public function clearCache(): RedirectResponse
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

    public function generateSitemap()
    {
        $sitemap = Sitemap::create();

        if(setting('sitemap_include_posts')) {
            Blog::published()->get()->each(function ($post) use ($sitemap) {
                $sitemap->add(
                    Url::create($post->slug)
                        ->setLastModificationDate($post->updated_at)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                        ->setPriority(0.6)
                );
            });
        }

//        if(setting('sitemap_include_pages')) {
//            Page::published()->get()->each(function ($post) use ($sitemap) {
//                $sitemap->add(
//                    Url::create(route('page.show', $post->slug))
//                        ->setLastModificationDate($post->updated_at)
//                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
//                        ->setPriority(0.6)
//                );
//            });
//        }
//
//        if (setting('sitemap_include_categories')) {
//            Category::all()->each(function ($category) use ($sitemap) {
//                $sitemap->add(Url::create(route('categories.show', $category->slug)));
//            });
//        }

        // Save to public/sitemap.xml
        $sitemap->writeToFile(public_path('sitemap.xml'));

        return back()->with('success', 'Sitemap generated successfully!');
    }
    private function url($loc, $lastmod)
    {
        return "
        <url>
            <loc>{$loc}</loc>
            <lastmod>{$lastmod->toAtomString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>";
    }
}
