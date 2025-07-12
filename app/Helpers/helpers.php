<?php

use App\Models\Setting;

if (! function_exists('setting')) {
    function setting(string $key, $default = null)
    {
        return Setting::get($key, $default);
    }
}

if (! function_exists('str_slug')) {
    /**
     * Generate a URL-friendly "slug" from a given string.
     *
     * @param  string  $string
     * @return string
     */
    function str_slug(string $string): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string)));
    }
}
if (!function_exists('the_permalink')) {
    function the_permalink($slug, $prefix = 'blog', $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        $base = config('app.url');
        return rtrim($base, '/') . '/' . trim("$locale/$prefix/$slug", '/');
    }
}

function settings($key = null)
{
    if (!empty($key)) {
        return Setting::selectSettings($key); // Fetch a specific setting
    }
    // Fetch all settings and decode them properly
    $settings = Setting::pluck('value', 'key')->all();
    foreach ($settings as $k => $v) {
        $settings[$k] = is_string($v) ? json_decode($v, false) : $v; // Convert JSON to object
    }
    return json_decode(json_encode($settings), false); // Convert array to an object
}
