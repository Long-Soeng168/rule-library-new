<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Page;
use App\Models\Post;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class BookCamboFrontPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::published()->limit(8)->with('category')->orderBy('id', 'desc')->get();
        $newArrivals = Item::published()->limit(16)->with('category')->orderBy('id', 'desc')->get();
        $categoriesWithItems = ItemCategory::limit(10)->with('items')->orderBy('order_index')->get();
        return Inertia::render('BookCambo/Index', [
            'posts' => $posts,
            'newArrivals' => $newArrivals,
            'categoriesWithItems' => $categoriesWithItems,
        ]);
    }

    public function about()
    {
        $aboutData = Page::where('code', 'about')->with('images')->first();
        return Inertia::render('BookCambo/About', [
            'aboutData' => $aboutData,
        ]);
    }
    public function support()
    {
        $contactData = Page::where('code', 'contact')->with('images')->first();
        return Inertia::render('BookCambo/Support', [
            'contactData' => $contactData,
        ]);
    }
    public function authors(Request $request)
    {
        $perPage = $request->input('perPage', 32);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $letter = $request->input('letter');

        $query = User::query();

        if ($letter) {
            $query->where(function ($q) use ($letter) {
                $q->where('name', 'LIKE', $letter . '%');
            });
        }
        $query->orderBy('name');

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%");
            });

            $query->orWhereHas('library_data', function ($sub_query) use ($search) {
                $sub_query->where('name_of_library', 'LIKE', "%{$search}%")
                    ->orWhere('affiliated_institution', 'LIKE', "%{$search}%")
                    ->orWhere('facebook_name', 'LIKE', "%{$search}%")
                    ->orWhere('website', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }


        $query->role('Author');
        $query->orderBy('id', 'desc');
        $query->with('library_data');

        $tableData = $query->paginate($perPage)->onEachSide(1);

        // return $tableData;
        return Inertia::render('BookCambo/Authors/Index', [
            'tableData' => $tableData,
        ]);
    }
    public function author_show(User $author)
    {
        $query = Item::query();
        $query->orderBy('id', 'desc');
        $query->with('category');

        $tableData = $query->published()->paginate(16)->onEachSide(1);

        return Inertia::render('BookCambo/Authors/Show', [
            'tableData' => $tableData,
            'showData' => $author->load([
                'library_data' => function ($query) {
                    $query->with([
                        'funding_type',
                        'class_type',
                        'province',
                        'library_type',
                        'target_users.type',
                        'age_of_target_users.type',
                    ]);
                },
            ]),
        ]);
    }
    public function publishers(Request $request)
    {
        $perPage = $request->input('perPage', 32);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $letter = $request->input('letter');

        $query = User::query();

        if ($letter) {
            $query->where(function ($q) use ($letter) {
                $q->where('name', 'LIKE', $letter . '%');
            });
        }
        $query->orderBy('name');

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%");
            });

            $query->orWhereHas('library_data', function ($sub_query) use ($search) {
                $sub_query->where('name_of_library', 'LIKE', "%{$search}%")
                    ->orWhere('affiliated_institution', 'LIKE', "%{$search}%")
                    ->orWhere('facebook_name', 'LIKE', "%{$search}%")
                    ->orWhere('website', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }


        $query->role('Publisher');
        $query->orderBy('id', 'desc');
        $query->with('library_data');

        $tableData = $query->paginate($perPage)->onEachSide(1);

        // return $tableData;
        return Inertia::render('BookCambo/Publishers/Index', [
            'tableData' => $tableData,
        ]);
    }
    public function publisher_show(User $publisher)
    {
        $query = Item::query();
        $query->orderBy('id', 'desc');
        $query->with('category');

        $tableData = $query->published()->paginate(16)->onEachSide(1);

        return Inertia::render('BookCambo/Publishers/Show', [
            'tableData' => $tableData,
            'showData' => $publisher->load([
                'library_data' => function ($query) {
                    $query->with([
                        'funding_type',
                        'class_type',
                        'province',
                        'library_type',
                        'target_users.type',
                        'age_of_target_users.type',
                    ]);
                },
            ]),
        ]);
    }
    public function books(Request $request)
    {
        $perPage = $request->input('perPage', 32);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $publisher_id = $request->input('publisher_id');
        $category_code = $request->input('category_code');
        $author_id = $request->input('author_id');
        $letter = $request->input('letter');

        $query = Item::query();

        // Exclude 'about' by selecting all other columns
        $columns = Schema::getColumnListing('items'); // get all columns dynamically
        $columns = array_diff($columns, ['long_description', 'long_description_kh']); // remove 'long_description' column
        $query->select($columns);

        if ($category_code) {
            $query->where('category_code', $category_code);
        }

        if ($publisher_id) {
            $query->where('publisher_id', $publisher_id);
        }

        if ($author_id) {
            $query->orWhereHas('authors', function ($q) use ($author_id) {
                $q->where('author_id', $author_id);
            });
        }

        if ($letter) {
            $query->where(function ($q) use ($letter) {
                $q->where('name', 'LIKE', $letter . '%')
                    ->orWhere('name_kh', 'LIKE', $letter . '%');
            });
        }
        $query->orderBy('name');

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%")
                    ->orWhere('keywords', 'LIKE', "%{$search}%");
            });
        }


        $query->orderBy('id', 'desc');
        $query->with('category');

        $tableData = $query->published()->paginate($perPage)->onEachSide(1);

        return Inertia::render('BookCambo/Books/Index', [
            'tableData' => $tableData,
            'categories' => ItemCategory::orderBy('order_index')->where('parent_id', null)->get(),
            'authors' => User::orderBy('name')->role('Author')->get(),
            'publishers' => User::orderBy('name')->role('Publisher')->get(),
        ]);
    }


    public function post_show(Post $post)
    {
        // return $post->load('files');
        $posts = Post::published()
            ->where('category_code', $post->category_code)
            ->where('id', '!=', $post->id) // exclude current post
            ->with('category')
            ->orderBy('id', 'desc')
            ->limit(8)
            ->get();

        return Inertia::render('BookCambo/Posts/Show', [
            'post' => $post->load('files', 'images'),
            'posts' => $posts,
        ]);
    }
    public function item_show(Item $item)
    {
        // return $item->load('files');
        $items = Item::published()->where('category_code', $item->category_code)
            ->where('id', '!=', $item->id) // exclude current item
            ->with('category')
            ->orderBy('id', 'desc')
            ->limit(8)
            ->get();
        // return $items;
        return Inertia::render('BookCambo/Books/Show', [
            'showData' => $item->load('files', 'images'),
            'items' => $items,
        ]);
    }
    public function books_by_category()
    {
        return Inertia::render('BookCambo/BookByCategory/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
