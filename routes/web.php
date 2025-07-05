<?php

use App\Http\Controllers\Frontend\FrontendController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\MediaController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontendController::class, 'index'])->name('home');

Route::post('/admin/clear-cache', function () {
    Cache::flush();
    return back()->with('success', 'All caches cleared.');
})->name('admin.clear.cache');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::get('get-media', [MediaController::class, 'getMedia'])->name('get-media');
    Route::resource('media', MediaController::class);
    Route::post('/media-upload', [MediaController::class, 'upload']);
    Route::post('/media/{id}/update-image', [MediaController::class, 'updateImage']);
    // upload from url
    Route::post('/media-upload-from-url', [MediaController::class, 'uploadFromUrl']);
});

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('settings', [SettingController::class, 'edit'])->name('admin.settings.edit');
    Route::post('settings', [SettingController::class, 'update'])->name('admin.settings.update');
    Route::post('settings/clear-cache', [SettingController::class, 'clearCache'])->name('admin.settings.clear');

    Route::get('/slug-check', [SettingController::class, 'check'])->name('slug.check');

});
require __DIR__.'/install.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/projects.php';

