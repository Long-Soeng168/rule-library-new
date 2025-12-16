<?php

use App\Http\Controllers\FrontPage\FrontPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontPageController::class, 'index'])->name('home');

Route::get('/profile', function () {
    return Inertia::render('FrontPage/Profile/Index');
});
Route::get('/posts', function () {
    return Inertia::render('FrontPage/Posts/Index');
});
Route::get('/posts/{post}', function () {
    return Inertia::render('FrontPage/Posts/Show');
});

Route::get('/scan-qr', function () {
    return Inertia::render('FrontPage/ScanQR');
});
Route::get('/student-checkin', function () {
    return Inertia::render('FrontPage/StudentCheckin');
});


Route::get('/about', function () {
    return Inertia::render('FrontPage/About/Index');
});

Route::get('/our-journey', function () {
    return Inertia::render('FrontPage/About/OurJourney');
});
Route::get('/our-staffs', function () {
    return Inertia::render('FrontPage/About/OurStaffs');
});
Route::get('/our-staffs-structure', function () {
    return Inertia::render('FrontPage/About/OurStaffsStructure');
});

Route::get('/resources', function () {
    return Inertia::render('FrontPage/Resources/Index');
});
Route::get('/resources/theses', function () {
    return Inertia::render('FrontPage/Resources/MainCategory');
});
Route::get('/resources/theses/1', function () {
    return Inertia::render('FrontPage/Resources/Show');
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
