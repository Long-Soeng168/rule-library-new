<?php

namespace App\Http\Middleware;

use App\Models\Link;
use App\Models\PostCategory;
use App\Models\WebsiteInfo;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $active_category_code = $request->query('category_code');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'app_url' => config('app.url'),
            // 'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user() ? $request->user()->getRoleNames() : [],
                'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'warning' => $request->session()->get('warning'),
                ];
            },
            'CKEDITOR_USE_FILE_FULL_PATH' => env('CKEDITOR_USE_FILE_FULL_PATH', false),
            'can_switch_language' => config('app.can_switch_language'),
            'locale' => session('locale'),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',

            // Global Website Info
            'website_info' => WebsiteInfo::first(),
            'media_links' => Link::whereIn('type_code', ['social-media', 'contact'])->get(),

            // Buddhist Global Info
            'post_categories' => PostCategory::orderBy('order_index')->orderBy('name')->get(),
            'active_category_code' => $active_category_code,
            'selected_category' => PostCategory::where('code', $active_category_code)->first(),
        ];
    }
}
