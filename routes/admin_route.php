<?php

use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\ItemCategoryController;
use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\ItemMainCategoryController;
use App\Http\Controllers\Admin\KeyValueController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\LinkController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PostCategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\TypeController;
use App\Http\Controllers\Admin\TypeGroupController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WebsiteInfoController;
use App\Http\Controllers\RoleAndPermission\PermissionController;
use App\Http\Controllers\RoleAndPermission\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {

    // Roles & Permissions & User Route
    Route::resource('admin/permissions', PermissionController::class);
    Route::resource('admin/roles', RoleController::class);
    Route::resource('admin/users', UserController::class);
    Route::post('admin/users/{user}/update', [UserController::class, 'update']);
    Route::post('admin/users/{id}/recover', [UserController::class, 'recover']);
    // Route::get('/assign-admin', [RoleController::class, 'assignAdmin']);

    // Type
    Route::resource('admin/types', TypeController::class);
    Route::post('admin/types/{type}/update', [TypeController::class, 'update']);
    Route::post('admin/types/{id}/recover', [TypeController::class, 'recover']);

    // Type Group
    Route::resource('admin/type-groups', TypeGroupController::class);
    Route::post('admin/type-groups/{type_group}/update', [TypeGroupController::class, 'update']);
    Route::post('admin/type-groups/{id}/recover', [TypeGroupController::class, 'recover']);

    // Link
    Route::resource('admin/links', LinkController::class);
    Route::post('admin/links/{link}/update', [LinkController::class, 'update']);
    Route::post('admin/links/{id}/recover', [LinkController::class, 'recover']);

    // Key Value
    Route::resource('admin/key-values', KeyValueController::class);
    Route::post('admin/key-values/{key_value}/update', [KeyValueController::class, 'update']);
    Route::post('admin/key-values/{id}/recover', [KeyValueController::class, 'recover']);

    // FQA
    Route::resource('admin/faqs', FaqController::class);
    Route::post('admin/faqs/{faq}/update', [FaqController::class, 'update']);
    Route::post('admin/faqs/{id}/recover', [FaqController::class, 'recover']);

    // Location
    Route::resource('admin/locations', LocationController::class);
    Route::post('admin/locations/{location}/update', [LocationController::class, 'update']);
    Route::post('admin/locations/{id}/recover', [LocationController::class, 'recover']);

    // Language
    Route::resource('admin/languages', LanguageController::class);
    Route::post('admin/languages/{language}/update', [LanguageController::class, 'update']);
    Route::post('admin/languages/{id}/recover', [LanguageController::class, 'recover']);

    // Language
    Route::resource('admin/banners', BannerController::class);
    Route::post('admin/banners/{banner}/update', [BannerController::class, 'update']);
    Route::post('admin/banners/{id}/recover', [BannerController::class, 'recover']);

    // Website Info
    Route::resource('admin/website-infos', WebsiteInfoController::class);
    Route::post('admin/website-infos/{website_info}/update', [WebsiteInfoController::class, 'update']);
    Route::post('admin/website-infos/{id}/recover', [WebsiteInfoController::class, 'recover']);

    // Page
    Route::resource('admin/pages', PageController::class);
    Route::delete('admin/pages/images/{image}', [PageController::class, 'destroy_image']);
    Route::post('admin/pages/{page}/update', [PageController::class, 'update']);
    Route::post('admin/pages/{id}/recover', [PageController::class, 'recover']);

    // Post Category
    Route::resource('admin/post-categories', PostCategoryController::class);
    Route::post('admin/post-categories/{post_category}/update', [PostCategoryController::class, 'update']);
    Route::post('admin/post-categories/{id}/recover', [PostCategoryController::class, 'recover']);

    // Post
    Route::resource('admin/posts', PostController::class);
    Route::delete('admin/posts/images/{image}', [PostController::class, 'destroy_image']);
    Route::delete('admin/posts/files/{file}', [PostController::class, 'destroy_file']);
    Route::post('admin/posts/{post}/update', [PostController::class, 'update']);
    Route::post('admin/posts/{id}/recover', [PostController::class, 'recover']);

    // Item Category
    Route::resource('admin/item-categories', ItemCategoryController::class);
    Route::post('admin/item-categories/{item_category}/update', [ItemCategoryController::class, 'update']);
    Route::post('admin/item-categories/{id}/recover', [ItemCategoryController::class, 'recover']);

    Route::resource('admin/item-main-categories', ItemMainCategoryController::class);
    Route::post('admin/item-main-categories/{item_main_category}/update', [ItemMainCategoryController::class, 'update']);
    Route::post('admin/item-main-categories/{id}/recover', [ItemMainCategoryController::class, 'recover']);

    // Item
    Route::resource('admin/items', ItemController::class);
    Route::delete('admin/items/images/{image}', [ItemController::class, 'destroy_image']);
    Route::delete('admin/items/files/{file}', [ItemController::class, 'destroy_file']);
    Route::post('admin/items/{item}/update', [ItemController::class, 'update']);
    Route::post('admin/items/{id}/recover', [ItemController::class, 'recover']);

    Route::get('admin/sample-content', [PageController::class, 'recover']);


    Route::get('admin/sample-content', function () {
        return Inertia::render('Admin/SampleContent/Index');
    });

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
