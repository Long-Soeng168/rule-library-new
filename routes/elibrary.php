<?php

use App\Http\Controllers\FrontPageController;
use App\Http\Controllers\LibraryDataFrontPageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('ELibrary/Index');
// });
Route::get('/', [FrontPageController::class, 'index']);


Route::get('/profile', function () {
    return Inertia::render('ELibrary/Profile/Index');
});
Route::get('/posts', function () {
    return Inertia::render('ELibrary/Posts/Index');
});
Route::get('/posts/{post}', function () {
    return Inertia::render('ELibrary/Posts/Show');
});

Route::get('/scan-qr', function () {
    return Inertia::render('ELibrary/ScanQR');
});
Route::get('/student-checkin', function () {
    return Inertia::render('ELibrary/StudentCheckin');
});


Route::get('/about', function () {
    return Inertia::render('ELibrary/About');
});
Route::get('/resources', function () {
    return Inertia::render('ELibrary/Resources/Index');
});
Route::get('/our-journey', function () {
    return Inertia::render('ELibrary/TimelinePage');
});
Route::get('/resources/theses', function () {
    return Inertia::render('ELibrary/Resources/MainCategory');
});
Route::get('/resources/theses/1', function () {
    return Inertia::render('ELibrary/Resources/Show');
});


// $allowedSlugs = Category::whereIn('slug', ['theses', 'publications', 'audios', 'videos'])
//     ->pluck('slug')
//     ->toArray();

// Route::get('/{main_category}', function (Request $request, $main_category) {
//     return $main_category;
// })->whereIn('main_category', $allowedSlugs);

// Route::get('/{main_category}', function (Request $request, $main_category) {
//     return $main_category;
// })->whereIn('main_category', ['theses', 'publications', 'audios', 'videos']);
