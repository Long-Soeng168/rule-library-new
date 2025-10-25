<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\LibraryData;
use App\Models\Location;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class LibraryDataController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:library_data view', only: ['index', 'show']),
            new Middleware('permission:library_data create', only: ['create', 'store']),
            new Middleware('permission:library_data update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:library_data delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $trashed = $request->input('trashed'); // '', 'with', 'only'

        $query = LibraryData::query();

        $query->with('created_user', 'updated_user', 'user_owner');

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

        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
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


        $query->orderBy('id', 'desc');

        $tableData = $query->paginate($perPage)->onEachSide(1);

        // return Location::type('province')->withCount('libraries')->get();

        $libraryTypes  = Type::group('library-type-group')
            ->withCount(['type_libraries as libraries_count'])
            ->get();
        $fundingTypes  = Type::group('source-of-funding-type-group')
            ->withCount(['source_of_funding_libraries as libraries_count'])
            ->get();
        $classTypes  = Type::group('class-of-library-type-group')
            ->withCount(['class_libraries as libraries_count'])
            ->get();
        $annualBudgetTypes  = Type::group('annual-budget-type-group')
            ->withCount(['annual_budget_libraries as libraries_count'])
            ->get();
        $librarySystemsTypes  = Type::group('library-management-system-type-group')
            ->withCount(['library_management_system_libraries as libraries_count'])
            ->get();

        $targetUserTypes  = Type::group('target-user-type-group')
            ->withCount(['target_user_libraries as libraries_count'])
            ->get();
        $targetAgeUserTypes  = Type::group('age-of-target-user-type-group')
            ->withCount(['age_target_user_libraries as libraries_count'])
            ->get();

        $provincesData =  Location::type('province')->withCount('libraries')->get();
        // return $targetUserTypes;

        return Inertia::render('Admin/LibraryData/Index', [
            'tableData' => $tableData,
            'libraryTypes'  => $libraryTypes,
            'fundingTypes'        => $fundingTypes,
            'classTypes'          => $classTypes,
            'annualBudgetTypes'   => $annualBudgetTypes,
            'librarySystemsTypes' => $librarySystemsTypes,

            'targetUserTypes'     => $targetUserTypes,
            'targetAgeUserTypes'  => $targetAgeUserTypes,

            'provincesData' => $provincesData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/LibraryData/Create', [
            'users' => User::withoutLibraryData()->orderByDesc('id')->get(),
            'libraryTypes'        => Type::group('library-type-group')->get(),
            'fundingTypes'        => Type::group('source-of-funding-type-group')->get(),
            'classTypes'          => Type::group('class-of-library-type-group')->get(),
            'targetUserTypes'     => Type::group('target-user-type-group')->get(),
            'targetAgeUserTypes'  => Type::group('age-of-target-user-type-group')->get(),
            'annualBudgetTypes'   => Type::group('annual-budget-type-group')->get(),
            'librarySystemsTypes' => Type::group('library-management-system-type-group')->get(),
            'provincesData' => Location::type('province')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            // General Information
            'year_of_data' => 'required|integer|min:2000|max:' . date('Y') + 1,
            'user_id' => 'required|exists:users,id',
            'library_type_code' => 'required|string|exists:types,code',
            'name_of_library' => 'required|string|max:255',
            'affiliated_institution' => 'required|string|max:255',
            'source_of_funding_type_code' =>  'required|string|exists:types,code',
            'class_type_code' =>  'required|string|exists:types,code',
            'province_code' => 'required|string|max:255|exists:locations,code',
            'facebook_name' => 'required|string|max:255',
            'website' => 'required|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:1000',

            // Target users & Age groups
            'target_users' => 'required|array',
            'target_users.*' =>  'string|exists:types,code',
            'age_target_users' => 'required|array',
            'age_target_users.*' =>  'string|exists:types,code',

            // Statistics
            'memberships' => 'required|string|max:1000',
            'partnerships' => 'required|string|max:1000',
            'programs_and_projects' => 'required|string|max:2000',
            'annual_budget_type_code' =>  'required|string|exists:types,code',

            // Staff
            'full_time_staff_count' => 'required|integer|min:0',
            'part_time_staff_count' => 'required|integer|min:0',
            'volunteers_count' => 'required|integer|min:0',
            'physical_size' => 'required|numeric|min:0',

            // Facilities
            'table_count' => 'required|integer|min:0',
            'chair_count' => 'required|integer|min:0',
            'computer_count' => 'required|integer|min:0',
            'meeting_room_count' => 'required|integer|min:0',
            'library_system_type_code' =>  'required|string|exists:types,code',

            // Collections
            'monograph_title_count' => 'required|integer|min:0',
            'monograph_count' => 'required|integer|min:0',
            'serial_title_count' => 'required|integer|min:0',
            'article_databases_count' => 'required|integer|min:0',

            // Usage
            'user_count' => 'required|integer|min:0',
            'unique_user_count' => 'required|integer|min:0',
            'unique_borrower_count' => 'required|integer|min:0',
            'book_or_material_borrowed_count' => 'required|integer|min:0',
            'online_resource_downloaded_count' => 'required|integer|min:0',
            'online_resource_viewer_count' => 'required|integer|min:0',
            'website_visitor_count' => 'required|integer|min:0',
            'facebook_like_count' => 'required|integer|min:0',

            // Files
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
            'about' => 'nullable|string',

            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        if (LibraryData::where('user_id', $request->user_id)->exists()) {
            return redirect()->back()->withErrors('User already has a library.');
        }

        if (trim($validated['about']) === '<p>&nbsp;</p>') {
            $validated['about'] = null;
        }

        $target_users = $request->target_users;
        $age_target_users = $request->age_target_users;
        unset($validated['target_users'], $validated['age_target_users']);

        try {
            // Add creator and updater
            $validated['created_by'] = $request->user()->id;
            $validated['updated_by'] = $request->user()->id;

            // Handle image upload if present
            if ($request->hasFile('logo')) {
                $imageName = ImageHelper::uploadAndResizeImageWebp(
                    $request->file('logo'),
                    'assets/images/library_data',
                    600
                );
                $validated['logo'] = $imageName;
            }

            // Handle banner upload if present
            if ($request->hasFile('banner')) {
                $bannerName = ImageHelper::uploadAndResizeImageWebp(
                    $request->file('banner'),
                    'assets/images/library_data',
                    1200 // banner usually wider
                );
                $validated['banner'] = $bannerName;
            }

            // Create the Library Data
            $created = LibraryData::create($validated);

            // Check if role exists, if not create it
            $roleName = 'Library Manager';
            $role = Role::firstOrCreate(['name' => $roleName]);

            // Assign library_data_id and role
            $userOwner = User::find($request->user_id);
            if ($userOwner) {
                $userOwner->update(['library_data_id' => $created->id]);
                $userOwner->assignRole($roleName);
            }

            // Save Target Users
            if (!empty($target_users)) {
                foreach ($target_users as $typeCode) {
                    $created->target_users()->create([
                        'target_user_type_code' => $typeCode,
                    ]);
                }
            }

            // Save Age Groups
            if (!empty($age_target_users)) {
                foreach ($age_target_users as $typeCode) {
                    $created->age_of_target_users()->create([
                        'age_target_type_code' => $typeCode,
                    ]);
                }
            }

            return redirect()->back()->with('success', 'Library Data created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to create Library Data: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(LibraryData $library_data)
    {
        $library_data = $library_data->load('target_users', 'age_of_target_users');

        return Inertia::render('Admin/LibraryData/Create', [
            'readOnly' => true,
            'editData' => $library_data,
            'users' => User::withoutLibraryData($library_data->user_id)->orderByDesc('id')->get(),
            'libraryTypes'        => Type::group('library-type-group')->get(),
            'fundingTypes'        => Type::group('source-of-funding-type-group')->get(),
            'classTypes'          => Type::group('class-of-library-type-group')->get(),
            'targetUserTypes'     => Type::group('target-user-type-group')->get(),
            'targetAgeUserTypes'  => Type::group('age-of-target-user-type-group')->get(),
            'annualBudgetTypes'   => Type::group('annual-budget-type-group')->get(),
            'librarySystemsTypes' => Type::group('library-management-system-type-group')->get(),
            'provincesData' => Location::type('province')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LibraryData $library_data)
    {
        $library_data->load('target_users', 'age_of_target_users');

        // convert to simple arrays
        $library_data->target_users_pluck = $library_data->target_users->pluck('target_user_type_code')->toArray();
        $library_data->age_target_users_pluck = $library_data->age_of_target_users->pluck('age_target_type_code')->toArray();

        // return ($library_data);
        return Inertia::render('Admin/LibraryData/Create', [
            'editData' => $library_data,
            'users' => User::withoutLibraryData($library_data->user_id)->orderByDesc('id')->get(),
            'libraryTypes'        => Type::group('library-type-group')->get(),
            'fundingTypes'        => Type::group('source-of-funding-type-group')->get(),
            'classTypes'          => Type::group('class-of-library-type-group')->get(),
            'targetUserTypes'     => Type::group('target-user-type-group')->get(),
            'targetAgeUserTypes'  => Type::group('age-of-target-user-type-group')->get(),
            'annualBudgetTypes'   => Type::group('annual-budget-type-group')->get(),
            'librarySystemsTypes' => Type::group('library-management-system-type-group')->get(),
            'provincesData' => Location::type('province')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LibraryData $library_data)
    {
        $validated = $request->validate([
            // General Information
            'year_of_data' => 'required|integer|min:2000|max:' . date('Y') + 1,
            'user_id' => 'required|exists:users,id',
            'library_type_code' => 'nullable|string|exists:types,code',
            'name_of_library' => 'required|string|max:255',
            'affiliated_institution' => 'nullable|string|max:255',
            'source_of_funding_type_code' =>  'nullable|string|exists:types,code',
            'class_type_code' =>  'nullable|string|exists:types,code',
            'province_code' => 'nullable|string|max:255|exists:locations,code',
            'facebook_name' => 'nullable|string|max:255',
            'website' => 'nullable|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:1000',

            // Target users & Age groups
            'target_users' => 'nullable|array',
            'target_users.*' =>  'string|exists:types,code',
            'age_target_users' => 'nullable|array',
            'age_target_users.*' =>  'string|exists:types,code',

            // Statistics
            'memberships' => 'nullable|string|max:1000',
            'partnerships' => 'nullable|string|max:1000',
            'programs_and_projects' => 'nullable|string|max:2000',
            'annual_budget_type_code' =>  'nullable|string|exists:types,code',

            // Staff
            'full_time_staff_count' => 'nullable|integer|min:0',
            'part_time_staff_count' => 'nullable|integer|min:0',
            'volunteers_count' => 'nullable|integer|min:0',
            'physical_size' => 'nullable|numeric|min:0',

            // Facilities
            'table_count' => 'nullable|integer|min:0',
            'chair_count' => 'nullable|integer|min:0',
            'computer_count' => 'nullable|integer|min:0',
            'meeting_room_count' => 'nullable|integer|min:0',
            'library_system_type_code' =>  'nullable|string|exists:types,code',

            // Collections
            'monograph_title_count' => 'nullable|integer|min:0',
            'monograph_count' => 'nullable|integer|min:0',
            'serial_title_count' => 'nullable|integer|min:0',
            'article_databases_count' => 'nullable|integer|min:0',

            // Usage
            'user_count' => 'nullable|integer|min:0',
            'unique_user_count' => 'nullable|integer|min:0',
            'unique_borrower_count' => 'nullable|integer|min:0',
            'book_or_material_borrowed_count' => 'nullable|integer|min:0',
            'online_resource_downloaded_count' => 'nullable|integer|min:0',
            'online_resource_viewer_count' => 'nullable|integer|min:0',
            'website_visitor_count' => 'nullable|integer|min:0',
            'facebook_like_count' => 'nullable|integer|min:0',

            // Files
            'logo' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
            'banner' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
            'about' => 'nullable|string',

            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $target_users = $request->target_users;
        $age_target_users = $request->age_target_users;
        unset($validated['target_users'], $validated['age_target_users']);

        if (trim($validated['about']) === '<p>&nbsp;</p>') {
            $validated['about'] = null;
        }
 

        try {
            // track updater
            $validated['updated_by'] = $request->user()->id;
            $validated['updated_at'] = now();

            $imageFile = $request->file('logo');
            unset($validated['logo']);

            // Handle image upload if present
            if ($imageFile) {
                $imageName = ImageHelper::uploadAndResizeImageWebp(
                    $imageFile,
                    'assets/images/library_data',
                    600
                );

                $validated['logo'] = $imageName;

                // delete old if replaced
                if ($imageName && $library_data->logo) {
                    ImageHelper::deleteImage($library_data->logo, 'assets/images/library_data');
                }
            }

            // Handle banner upload
            $bannerFile = $request->file('banner');
            unset($validated['banner']);

            if ($bannerFile) {
                $bannerName = ImageHelper::uploadAndResizeImageWebp(
                    $bannerFile,
                    'assets/images/library_data',
                    1200 // bigger width for banner maybe?
                );

                $validated['banner'] = $bannerName;

                // delete old if replaced
                if ($bannerName && $library_data->banner) {
                    ImageHelper::deleteImage($library_data->banner, 'assets/images/library_data');
                }
            }

            // Ensure the role exists
            $roleName = 'Library Manager';
            Role::firstOrCreate(['name' => $roleName]);

            // Get current owner
            $currentOwner = User::find($library_data->user_id);

            // If owner changed
            if ($library_data->user_id !== $request->user_id) {
                // Remove old owner role & unlink
                if ($currentOwner) {
                    $currentOwner->update(['library_data_id' => null]);
                    $currentOwner->removeRole($roleName);
                }

                // Assign new owner
                $newOwner = User::find($request->user_id);
                if ($newOwner) {
                    $newOwner->update(['library_data_id' => $library_data->id]);
                    $newOwner->assignRole($roleName);
                }
            } else {
                // Owner didn't change, ensure they have the role
                if ($currentOwner && !$currentOwner->hasRole($roleName)) {
                    $currentOwner->assignRole($roleName);
                }
            }

            // Update LibraryData
            $library_data->update($validated);

            // Sync target users
            $library_data->target_users()->delete();
            if (!empty($target_users)) {
                $library_data->target_users()->createMany(
                    collect($target_users)->map(fn($code) => [
                        'target_user_type_code' => $code
                    ])->toArray()
                );
            }

            // Sync age groups
            $library_data->age_of_target_users()->delete();
            if (!empty($age_target_users)) {
                $library_data->age_of_target_users()->createMany(
                    collect($age_target_users)->map(fn($code) => [
                        'age_target_type_code' => $code
                    ])->toArray()
                );
            }


            return redirect()->back()->with('success', 'Library Data updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update Library Data: ' . $e->getMessage());
        }
    }


    public function recover($id)
    {
        $library_data = LibraryData::withTrashed()->findOrFail($id); // 👈 include soft-deleted Library Data
        $library_data->restore(); // restores deleted_at to null
        return redirect()->back()->with('success', 'Library Data recovered successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibraryData $library_data)
    {
        // if ($user->image) {
        //     ImageHelper::deleteImage($user->image, 'assets/images/users');
        // }

        $library_data->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Library Data deleted successfully.');
    }
}
