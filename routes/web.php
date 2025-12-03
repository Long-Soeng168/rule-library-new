<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

// ==== Switch Language ====
Route::get('/lang/{locale}', function ($locale) {
    if (!in_array($locale, ['en', 'kh'])) {
        abort(404);
    }
    Session::put('locale', $locale);
    return redirect()->back();
});

// ==== Test Error ====
Route::get('/test_error', function () {
    abort('503', 'hi');
});

// ==== Default Routes ====
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/file_manager.php';

// ====Admin & LibraryDataFrontPage Routes ====
require __DIR__ . '/admin_route.php';
// require __DIR__ . '/library_data_route.php';

// ==== Other Routes ====
require __DIR__ . '/file_stream_route.php';

require __DIR__ . '/elibrary.php';

// ==== Telegram Auth ====
require __DIR__ . '/telegram_auth.php';
