<?php

namespace App\Console\Commands;

use App\Models\Blog;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.xml file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create();
        $sitemap->add(Url::create(url('/')));

        if (setting('sitemap_include_posts')) {
            Blog::published()->get()->each(function ($post) use ($sitemap) {
                $sitemap->add(
                    Url::create($post->slug)
                        ->setLastModificationDate($post->updated_at)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                        ->setPriority(0.8)
                );
            });
        }

//        if (setting('sitemap_include_pages')) {
//            Page::published()->get()->each(function ($page) use ($sitemap) {
//                $sitemap->add(
//                    Url::create(route('pages.show', $page->slug))
//                        ->setLastModificationDate($page->updated_at)
//                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
//                        ->setPriority(0.6)
//                );
//            });
//        }

//        if (setting('sitemap_include_categories')) {
//            Category::all()->each(function ($cat) use ($sitemap) {
//                $sitemap->add(
//                    Url::create(route('categories.show', $cat->slug))
//                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
//                        ->setPriority(0.5)
//                );
//            });
//        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully!');
        return Command::SUCCESS;
    }
}
