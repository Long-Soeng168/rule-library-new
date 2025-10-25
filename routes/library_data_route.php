<?php

use App\Http\Controllers\LibraryDataFrontPageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Dynamic
Route::get('/', [LibraryDataFrontPageController::class, 'index']);
Route::get('/about', [LibraryDataFrontPageController::class, 'about']);
Route::get('/contact', [LibraryDataFrontPageController::class, 'contact']);
Route::get('/libraries', [LibraryDataFrontPageController::class, 'libraries']);
Route::get('/libraries/{id}', [LibraryDataFrontPageController::class, 'library_show']);
