<?php

namespace App\Providers;

use App\Repositories\BlogRepository;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(BlogRepository::class, fn () => new BlogRepository());
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schedule::command('sitemap:generate')->everyTenMinutes();
    }
}
