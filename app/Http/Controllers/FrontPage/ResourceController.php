<?php

namespace App\Http\Controllers\FrontPage;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\ItemMainCategory;
use App\Models\Language;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function main_category(string $main_category_code, Request $request)
    {
        $main_category = ItemMainCategory::where('code', $main_category_code)->firstOrFail();

        $perPage = $request->input('perPage', 16);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $type_code = $request->input('type_code');
        $category_code = $request->input('category_code');
        $language_code = $request->input('language_code');

        $query = Item::query();

        $query->select('id', 'name', 'name_kh', 'short_description', 'short_description_kh', 'thumbnail', 'main_category_code', 'created_at');

        if ($type_code) {
            $query->where('type_code', $type_code);
        }
        if ($category_code) {
            $query->where('category_code', $category_code);
        }
        if ($language_code) {
            $query->where('language_code', $language_code);
        }

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%")
                    ->orWhere('category_code', 'LIKE', "%{$search}%")
                    ->orWhere('keywords', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%")
                    ->orWhere('short_description_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->where('main_category_code', $main_category_code);
        $query->where('status', 'published');
        $query->orderBy('id', 'desc');

        $tableData = $query->paginate($perPage)->onEachSide(2);

        $categories = ItemCategory::where('parent_id', null)
            ->where('item_main_category_code', $main_category_code)
            ->orderBy('order_index')
            ->with(['children' => function ($q) {
                $q->orderBy('order_index');
            }])
            ->get();

        $authors = User::role('Author')
            ->orderByDesc('author_items_count')
            ->orderBy('name')
            ->select('id', 'name', 'name_kh', 'title_type_code')
            ->withCount([
                'author_items' => fn($q) =>
                $q->where('main_category_code', $main_category_code),
            ])
            ->get();
        $publishers = User::role('Publisher')
            ->orderByDesc('publisher_items_count')
            ->orderBy('name')
            ->select('id', 'name', 'name_kh', 'title_type_code')
            ->withCount([
                'publisher_items' => fn($q) =>
                $q->where('main_category_code', $main_category_code),
            ])
            ->get();
        $advisors = User::role('Advisor')
            ->orderByDesc('advisor_items_count')
            ->orderBy('name')
            ->select('id', 'name', 'name_kh', 'title_type_code')
            ->withCount([
                'advisor_items' => fn($q) =>
                $q->where('main_category_code', $main_category_code),
            ])
            ->get();

        $languages = Language::select('id', 'code', 'name', 'name_kh', 'image')
            ->orderByDesc('items_count')
            ->orderBy('order_index')
            ->withCount([
                'items' => fn($q) =>
                $q->where('main_category_code', $main_category_code),
            ])
            // ->having('items_count', '>', 0)
            ->get();

        // return $languages;

        return Inertia::render('FrontPage/Resources/MainCategory', [
            'tableData' => $tableData,
            'languages' => $languages,
            'categories' => $categories,
            'authors' => $authors,
            'publishers' => $publishers,
            'advisors' => $advisors,
        ]);
    }

    public function show(Post $post)
    {
        $query = Post::query();
        $query->where('status', 'published');
        $query->where('category_code', $post->category_code);
        $query->where('id', '!=', $post->id);
        $query->orderBy('id', 'desc');
        $query->select('id', 'title', 'title_kh', 'short_description', 'short_description_kh', 'thumbnail', 'created_at', 'category_code');

        $relatedData = $query->limit(6)->get();
        // return $relatedData;

        return Inertia::render('FrontPage/Posts/Show', [
            'showData' => $post->load('images', 'files', 'category'),
            'relatedData' => $relatedData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
