<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Faq;
use App\Models\KeyValue;
use App\Models\LibraryData;
use App\Models\Location;
use App\Models\Page;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class BuddhistFrontPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryWithPostsData = PostCategory::with(['posts' => function ($query) {
            $query->orderBy('created_at', 'desc')
                ->select(['id', 'category_code', 'thumbnail', 'title', 'title_kh', 'short_description', 'short_description_kh']) // include FK and PK
                ->limit(6);
        }])
            ->orderBy('order_index')
            ->orderBy('name')
            ->get();

        $slides = Banner::all();
        return Inertia::render('Buddhist/Index', [
            'categoryWithPostsData' => $categoryWithPostsData,
            'slides' => $slides,
        ]);
    }

    public function about()
    {
        $aboutData = Page::where('code', 'about')->with('images')->first();
        return Inertia::render('Buddhist/About', [
            'aboutData' => $aboutData,
        ]);
    }

    public function contact(Request $request)
    {
        return Inertia::render('TODO_PATH/Contact');
    }

    public function posts(Request $request)
    {
        $perPage = $request->input('perPage', 12);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $category_code = $request->input('category_code');
        $sort_by = $request->input('sort_by');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = Post::query();

        // Exclude 'about' by selecting all other columns
        $columns = Schema::getColumnListing('posts'); // get all columns dynamically
        $columns = array_diff($columns, ['long_description']); // remove 'about' column
        $query->select($columns);

        if ($value = $request->input('status')) {
            $query->where('status', $value);
        }
        // End Exclude

        if ($category_code) {
            $query->where('category_code', $category_code);
        }
        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('title_kh', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%")
                    ->orWhere('short_description_kh', 'LIKE', "%{$search}%")
                    ->orWhere('long_description', 'LIKE', "%{$search}%")
                    ->orWhere('long_description_kh', 'LIKE', "%{$search}%")
                    ->orWhere('category_code', 'LIKE', "%{$search}%");
            });
        }

        if ($sort_by) {
            switch ($sort_by) {
                case 'newest':
                    $query->orderBy('created_at', 'desc')->orderBy('id', 'desc');
                    break;

                case 'oldest':
                    $query->orderBy('created_at', 'asc')->orderBy('id', 'asc');
                    break;

                case 'az':
                    $query->orderBy('title', 'asc');
                    break;

                case 'za':
                    $query->orderBy('title', 'desc');
                    break;

                case 'most_viewed':
                    $query->orderBy('total_view_count', 'desc');
                    break;

                case 'least_viewed':
                    $query->orderBy('total_view_count', 'asc');
                    break;

                default:
                    // fallback if unknown value, optional
                    $query->orderBy('id', 'desc');
                    break;
            }
        } else {
            // default order if no sort_by param
            $query->orderBy('id', 'desc');
        }

        $query->with('category');

        $tableData = $query->paginate($perPage)->onEachSide(2);

        // $tableData =  $query->limit(2)->get();
        // return $tableData;

        return Inertia::render('Buddhist/Posts/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function post_show(Request $request, string $id)
    {
        $showData = Post::findOrFail($id)->load('category');
        $showData->increment('total_view_count');

        $query = Post::query();
        $columns = Schema::getColumnListing('posts');
        $columns = array_diff($columns, ['long_description']);

        // First related items
        $relatedItems = (clone $query)
            ->select($columns)
            ->where('category_code', $showData->category_code)
            ->inRandomOrder()
            ->limit(5)
            ->get();

        // Second related items, excluding the first set
        $relatedItemsTwo = (clone $query)
            ->select($columns)
            ->where('category_code', $showData->category_code)
            ->whereNotIn('id', $relatedItems->pluck('id')) // exclude first items
            ->inRandomOrder()
            ->limit(5)
            ->get();

        // Increase view count
        // return $relatedItems;
        return Inertia::render('Buddhist/Posts/Show', ['showData' => $showData, 'relatedItems' => $relatedItems, 'relatedItemsTwo' => $relatedItemsTwo]);
    }
}
