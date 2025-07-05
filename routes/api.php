<?php

use App\Http\Controllers\Admin\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/upload-image', [BlogController::class, 'upload'])->name('api.upload-image');
