<?php

namespace App\Http\Controllers\FrontPage;

use App\Http\Controllers\Controller;

use App\Models\Faq;
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
        $keyValueData = KeyValue::all();
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
                    ->orderByDesc('id')
                    ->limit(6);
            },
        ])
            ->select('id', 'code', 'name', 'name_kh', 'image')
            ->orderBy('order_index')
            ->get();

        $query = Post::query();


        $query->where('status', 'published');
        $query->orderByDesc('id');
        $query->select('id', 'title', 'title_kh', 'short_description', 'short_description_kh', 'thumbnail', 'created_at');

        $posts = $query->limit(4)->get();

        return Inertia::render('FrontPage/Index', [
            'whatWeOfferHeader' => $whatWeOfferHeader,
            'keyValueData' => $keyValueData,
            'faqData' => $faqData,

            'mainCategories' => $mainCategories,
            'posts' => $posts,
        ]);
    }
}
