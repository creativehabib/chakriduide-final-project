<?php

use App\Http\Controllers\SettingController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('settings/general', [SettingController::class, 'edit'])->name('admin.settings.edit');
    Route::post('settings/general', [SettingController::class, 'update'])->name('admin.settings.update');
    Route::post('settings/clear', [SettingController::class, 'clearCache'])->name('admin.settings.clear');



    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('settings/sitemap', [SettingController::class, 'sitemap'])->name('sitemap');


    Route::post('/admin/settings/generate-sitemap', [SettingController::class, 'generateSitemap'])
        ->name('admin.settings.generate-sitemap')
        ->middleware(['web']);

    Route::post('settings/sitemap', [SettingController::class, 'sitemapUpdate'])->name('settings.sitemap.update');
    Route::get('settings/robots-txt', [SettingController::class, 'robotsTxt'])->name('robots.txt.edit');
    Route::post('robots-txt/update', [SettingController::class, 'robotsTxtUpdate'])->name('robots.txt.update');


    Route::get('/settings/cronjob', function () {
        return Inertia::render('admin/settings/CronJobSetup');
    });


    Route::get('/settings/visits', [SettingController::class, 'userVisitInfo'])->name('visits.info');
});
