<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function () {

    // User Routes
    Route::resource('users', UserController::class)->names('users');
    Route::post('/users/{id}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');

    // Blog Routes
    Route::group(['prefix' => 'blog', 'as' => 'blog.'], function () {
        Route::resource('posts', BlogController::class)->names('posts');
        Route::resource('categories', CategoryController::class)->names('categories');
    });
});
