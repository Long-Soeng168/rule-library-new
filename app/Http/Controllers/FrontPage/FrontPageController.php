<?php

namespace App\Http\Controllers\FrontPage;

use App\Http\Controllers\Controller;

use App\Models\Faq;
use App\Models\ItemCategory;
use App\Models\ItemMainCategory;
use App\Models\KeyValue;
use App\Models\Location;
use App\Models\Page;
use App\Models\Post;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class FrontPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $whatWeOfferHeader = Page::where('code', 'what-we-offer')->with('children')->first();
        $faqData = Faq::all();

        $mainCategories = ItemMainCategory::with([
            'items' => function ($q) {
                $q->select(
                    'id',
                    'main_category_code', // REQUIRED
                    'name',
                    'name_kh',
                    'short_description',
                    'short_description_kh',
                    'thumbnail',
                    'category_code',
                    'created_at'
                )
                    ->where('status', 'published')
                    ->orderByDesc('id')
                    ->limit(6);
            },
        ])
            ->select('id', 'code', 'name', 'name_kh', 'image')
            ->orderBy('order_index')
            ->get();

        $postQuery = Post::query();


        $postQuery->where('status', 'published');
        $postQuery->orderByDesc('id');
        $postQuery->select('id', 'title', 'title_kh', 'category_code', 'short_description', 'short_description_kh', 'thumbnail', 'created_at');
        $postQuery->with('category');

        $posts = $postQuery->limit(4)->get();

        $thesisCategories = ItemCategory::select('id', 'code', 'item_main_category_code', 'name', 'name_kh', 'image', 'order_index')->where('parent_id', null)
            ->where('item_main_category_code', 'theses')
            ->orderBy('order_index')
            ->get();
        $publicationCategories = ItemCategory::select('id', 'code', 'item_main_category_code', 'name', 'name_kh', 'image', 'order_index')->where('parent_id', null)
            ->where('item_main_category_code', 'publications')
            ->orderBy('order_index')
            ->get();
        $keyValueData = KeyValue::select('id', 'value', 'name', 'name_kh', 'image', 'order_index', 'short_description', 'short_description_kh')
            ->orderBy('order_index')
            ->get();

        // return $publicationCategories;

        return Inertia::render('FrontPage/Index', [
            'whatWeOfferHeader' => $whatWeOfferHeader,
            'keyValueData' => $keyValueData,
            'faqData' => $faqData,

            'mainCategories' => $mainCategories,
            'thesisCategories' => $thesisCategories,
            'publicationCategories' => $publicationCategories,
            'posts' => $posts,
        ]);
    }
}
