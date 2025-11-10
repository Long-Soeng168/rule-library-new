<?php

use App\Http\Controllers\FileStreamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/stream_pdf/{resource}/{id}/{file_name}', [FileStreamController::class, 'stream_pdf']);
Route::get('/view-pdf', [FileStreamController::class, 'view_pdf']);
