<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'meta_title' => 'My Awesome Blog',
            'meta_description' => 'Default blog description',
            'og_image' => null,
            'favicon' => null,
            'header_script' => null,
            'footer_script' => null,
            'meta_pixel_id' => null,
            'google_analytics_id' => null,
            'cookie_consent_text' => 'এই সাইটটি কুকি ব্যবহার করে।',
            'allow_registration' => true,
            'allow_indexing' => true,
            'robots_txt' => "User-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml",
            'site_name' => 'My Site',
            'site_email' => 'admin@example.com',
            'site_description' => 'Default description',
            'cache_blog_enabled' => true,
            'cache_blog_duration' => 10,
        ];

        foreach ($defaults as $key => $value) {
            Setting::set($key, $value);
        }
    }
}
