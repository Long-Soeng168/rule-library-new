<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\KeyValue;
use App\Models\LibraryData;
use App\Models\Location;
use App\Models\Page;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class LibraryDataFrontPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $homepageHero = Page::where('code', 'homepage-hero')->first();
        $librariesHeader = Page::where('code', 'libraries')->first();
        $libraryTypeHeader = Page::where('code', 'types-of-libraries')->first();
        $sourceOfFundingHeader = Page::where('code', 'sources-of-funding')->first();
        $provinceHeader = Page::where('code', 'provinces')->first();
        $claStatisticHeader = Page::where('code', 'cambodia-library-association-statistic')->first();
        $whatWeOfferHeader = Page::where('code', 'what-we-offer')->with('children')->first();

        $libraryData = LibraryData::approved()->limit(10)->with('province')->orderBy('id', 'desc')->get();
        $libraryTypes = Type::group('library-type-group')->get();
        $fundingTypes = Type::group('source-of-funding-type-group')->get();

        $provincesData = Location::type('province')
            ->orderBy('order_index')
            ->withCount('libraries')
            ->orderBy('libraries_count', 'desc')
            ->limit(4)
            ->get();

        $keyValueData = KeyValue::all();
        $faqData = Faq::all();


        return Inertia::render('LibraryDataFrontPage/Index', [
            'homepageHero' => $homepageHero,
            'librariesHeader' => $librariesHeader,
            'libraryTypeHeader' => $libraryTypeHeader,
            'sourceOfFundingHeader' => $sourceOfFundingHeader,
            'provinceHeader' => $provinceHeader,
            'claStatisticHeader' => $claStatisticHeader,
            'whatWeOfferHeader' => $whatWeOfferHeader,
            'libraryData' => $libraryData,
            'libraryTypes' => $libraryTypes,
            'fundingTypes' => $fundingTypes,
            'provincesData' => $provincesData,
            'keyValueData' => $keyValueData,
            'faqData' => $faqData,
        ]);
    }

    public function about()
    {
        $aboutData = Page::where('code', 'about')->with('images')->first();
        return Inertia::render('LibraryDataFrontPage/About', [
            'aboutData' => $aboutData,
        ]);
    }

    public function contact(Request $request)
    {
        return Inertia::render('LibraryDataFrontPage/Contact');
    }

    public function libraries(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = LibraryData::query();

        // Exclude 'about' by selecting all other columns
        $columns = Schema::getColumnListing('library_data'); // get all columns dynamically
        $columns = array_diff($columns, ['about']); // remove 'about' column
        $query->select($columns);

        if ($value = $request->input('status')) {
            $query->where('status', $value);
        }
        // Define the filters we care about
        $typeFilters = [
            'library_type_code',
            'source_of_funding_type_code',
            'class_type_code',
            'annual_budget_type_code',
            'library_system_type_code',
            'province_code',
        ];

        // Loop through and apply
        foreach ($typeFilters as $filter) {
            if ($value = $request->input($filter)) {
                $query->where($filter, $value);
            }
        }

        // ✅ relationships
        if ($request->filled('target_user_type_code')) {
            $query->whereHas('target_users', function ($q) use ($request) {
                $q->where('target_user_type_code', $request->target_user_type_code);
            });
        }

        if ($request->filled('target_age_user_type_code')) {
            $query->whereHas('age_of_target_users', function ($q) use ($request) {
                $q->where('age_target_type_code', $request->target_age_user_type_code);
            });
        }

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('name_of_library', 'LIKE', "%{$search}%")
                    ->orWhere('affiliated_institution', 'LIKE', "%{$search}%")
                    ->orWhere('about', 'LIKE', "%{$search}%")
                    ->orWhere('facebook_name', 'LIKE', "%{$search}%")
                    ->orWhere('website', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }


        $query->orderBy('id', 'desc');
        $query->with('funding_type', 'class_type', 'province', 'library_type');

        $tableData = $query->approved()->paginate($perPage)->onEachSide(1);

        return Inertia::render('LibraryDataFrontPage/Libraries/Index', [
            'tableData' => $tableData,
            'libraryTypes'        => Type::group('library-type-group')->get(),
            'fundingTypes'        => Type::group('source-of-funding-type-group')->get(),
            'classTypes'          => Type::group('class-of-library-type-group')->get(),
            'provincesData' => Location::type('province')->orderBy('order_index')->orderBy('name')->get(),
        ]);
    }

    public function library_show(Request $request, string $id)
    {
        $showData = LibraryData::findOrFail($id)->load('funding_type', 'class_type', 'province', 'library_type', 'target_users.type', 'age_of_target_users.type');
        // Increase view count
        $showData->increment('total_view_count');
        // return $showData;
        return Inertia::render('LibraryDataFrontPage/Libraries/Show', ['showData' => $showData]);
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
