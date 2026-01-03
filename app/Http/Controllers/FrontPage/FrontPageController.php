<?php

namespace App\Http\Controllers\FrontPage;

use App\Http\Controllers\Controller;

use App\Models\Faq;
use App\Models\KeyValue;
use App\Models\Location;
use App\Models\Page;
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
        $homepageHero = Page::where('code', 'homepage-hero')->first();
        $librariesHeader = Page::where('code', 'libraries')->first();
        $libraryTypeHeader = Page::where('code', 'types-of-libraries')->first();
        $sourceOfFundingHeader = Page::where('code', 'sources-of-funding')->first();
        $provinceHeader = Page::where('code', 'provinces')->first();
        $claStatisticHeader = Page::where('code', 'cambodia-library-association-statistic')->first();
        $whatWeOfferHeader = Page::where('code', 'what-we-offer')->with('children')->first();

        $libraryTypes = Type::group('library-type-group')->get();
        $fundingTypes = Type::group('source-of-funding-type-group')->get();

        $provincesData = Location::type('province')
            ->orderBy('order_index')
            ->limit(4)
            ->get();

        $keyValueData = KeyValue::all();
        $faqData = Faq::all();


        return Inertia::render('FrontPage/Index', [
            'homepageHero' => $homepageHero,
            'librariesHeader' => $librariesHeader,
            'libraryTypeHeader' => $libraryTypeHeader,
            'sourceOfFundingHeader' => $sourceOfFundingHeader,
            'provinceHeader' => $provinceHeader,
            'claStatisticHeader' => $claStatisticHeader,
            'whatWeOfferHeader' => $whatWeOfferHeader,
            'libraryTypes' => $libraryTypes,
            'fundingTypes' => $fundingTypes,
            'provincesData' => $provincesData,
            'keyValueData' => $keyValueData,
            'faqData' => $faqData,
        ]);
    }
}
