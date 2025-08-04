<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Frontend\FrontendController;
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

// routes/web.php


Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/questions', [QuestionController::class, 'index'])->name('questions.index');
    Route::get('/questions/create', [QuestionController::class, 'create'])->name('questions.create');
    Route::post('/questions', [QuestionController::class, 'store'])->name('questions.store');
    Route::get('/questions/{question}/edit', [QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('/questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
    Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])->name('questions.destroy');
});


Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/{slug}', [FrontendController::class, 'singlePost'])->name('blog.show');


