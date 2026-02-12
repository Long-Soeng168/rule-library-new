<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Circulation;
use App\Models\ItemPhysicalCopy;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPUnit\Framework\isNull;

class CirculationController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:circulation view', only: ['index', 'show']),
            new Middleware('permission:circulation create', only: ['create', 'store']),
            new Middleware('permission:circulation update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:circulation delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $users_searched = [];

        // Only hit the database if the user actually typed something
        if (!empty($search)) {
            $users_searched = User::query()
                ->where(function ($sub_query) use ($search) {
                    $sub_query->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('name_kh', 'LIKE', "%{$search}%")
                        ->orWhere('card_number', 'LIKE', "%{$search}%")
                        ->orWhere('id', 'LIKE', "%{$search}%")
                        ->orWhere('phone', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%");
                })
                // Move sorting inside the search block for better performance
                ->orderBy('card_number')
                ->orderBy('name')
                ->limit(10)
                ->get();
        }

        // return $users_searched;

        return Inertia::render('Admin/Circulation/Index', [
            'users_searched' => $users_searched,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Circulation/Create',);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'borrower_id'                 => 'required|exists:users,id',
            'item_physical_copy_barcode' => [
                'required',
                'exists:item_physical_copies,barcode,deleted_at,NULL'
            ],
        ]);

        $physical_copy = ItemPhysicalCopy::where('barcode', $request->item_physical_copy_barcode)->first();

        // Koha Business Logic: Prevent checkout if item is not available
        if ($physical_copy->not_for_loan || $physical_copy->item_lost || $physical_copy->withdrawn) {
            return redirect()->back()->withErrors('Failed to Checkout: Item is restricted or lost.');
        }

        // Check if already on loan
        $active_loan = Circulation::where('item_physical_copy_id', $physical_copy->id)
            ->whereNull('returned_at')
            ->first();

        if ($active_loan) {
            return redirect()->back()->withErrors('Failed to Checkout: Item is already on loan to another borrower.');
        }

        try {
            DB::transaction(function () use ($request, $physical_copy) {
                $due_date = now()->addDays(14); // Standard Koha 14-day loan

                // 1. Create Circulation Record
                Circulation::create([
                    'item_physical_copy_id' => $physical_copy->id,
                    'borrower_id'           => $request->borrower_id,
                    'borrowed_at'           => now(),
                    'due_at'                => $due_date,
                    'created_by'            => $request->user()->id,
                    'updated_by'            => $request->user()->id,
                ]);

                // 2. Update Physical Copy Status
                $physical_copy->update([
                    'borrowed_at'      => now(),
                    'due_at'           => $due_date,
                    'last_borrowed_at' => now(),
                    'total_checkouts'  => $physical_copy->total_checkouts + 1,
                    'updated_by'       => $request->user()->id,
                ]);
            });

            return redirect()->back()->with('success', 'Checkout successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to Checkout: ' . $e->getMessage());
        }
    }
    public function checkin(Request $request)
    {
        $request->validate([
            'item_physical_copy_barcode' => [
                'required',
                'exists:item_physical_copies,barcode,deleted_at,NULL'
            ],
        ]);

        $physical_copy = ItemPhysicalCopy::where('barcode', $request->item_physical_copy_barcode)->first();

        // Find the active circulation record
        $active_loan = Circulation::where('item_physical_copy_id', $physical_copy->id)
            ->whereNull('returned_at')
            ->first();

        if (!$active_loan) {
            return redirect()->back()->withErrors('Failed to Check-in: Item is not currently on loan.');
        }

        try {
            DB::transaction(function () use ($request, $physical_copy, $active_loan) {
                $fine = 0;
                // Simple Fine Logic: $1 per day late
                if ($active_loan->due_at && now()->gt($active_loan->due_at)) {
                    $days_late = now()->diffInDays($active_loan->due_at);
                    $fine = $days_late * 1.00;
                }

                // 1. Close the Circulation Record
                $active_loan->update([
                    'returned_at' => now(),
                    'fine_amount' => $fine,
                    'fine_paid'   => $fine > 0 ? false : true,
                    'updated_by'  => $request->user()->id,
                ]);

                // 2. Reset Physical Copy Status
                $physical_copy->update([
                    'borrowed_at'  => null,
                    'due_at'       => null,
                    'last_seen_at' => now(),
                    'updated_by'   => $request->user()->id,
                ]);
            });

            return redirect()->back()->with('success', 'Check-in successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to Check-in: ' . $e->getMessage());
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(Circulation $circulation_rule)
    {
        return Inertia::render('Admin/Circulation/Create', [
            'editData' => $circulation_rule,
            'readOnly' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Circulation $circulation_rule)
    {
        return Inertia::render('Admin/Circulation/Create', [
            'editData' => $circulation_rule,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Circulation $circulation_rule)
    {
        $validated = $request->validate([
            'fine_amount_per_day' => 'required|numeric|min:0|max:999999.99',
            'max_fines_amount' => 'required|numeric|min:0|max:999999.99',
            'borrowing_limit' => 'required|integer|min:0|max:1000',
            'loan_period' => 'required|integer|min:1|max:365', // Limit to a year max for safety
        ]);

        try {
            // separate file handling for logos
            $logoFile = $request->file('logo');
            $darkLogoFile = $request->file('logo_darkmode');

            unset($validated['logo'], $validated['logo_darkmode']);

            // Handle normal logo
            if ($logoFile) {
                $logoName = ImageHelper::uploadAndResizeImageWebp(
                    $logoFile,
                    'assets/images/circulation_rules',
                    600
                );

                // delete old logo if exists
                if ($circulation_rule->logo) {
                    ImageHelper::deleteImage($circulation_rule->logo, 'assets/images/circulation_rules');
                }

                $validated['logo'] = $logoName;
            }

            // Handle dark mode logo
            if ($darkLogoFile) {
                $darkLogoName = ImageHelper::uploadAndResizeImageWebp(
                    $darkLogoFile,
                    'assets/images/circulation_rules',
                    600
                );

                // delete old dark logo if exists
                if ($circulation_rule->logo_darkmode) {
                    ImageHelper::deleteImage($circulation_rule->logo_darkmode, 'assets/images/circulation_rules');
                }

                $validated['logo_darkmode'] = $darkLogoName;
            }

            // Update the Circulation Rule
            $circulation_rule->update($validated);

            return redirect()->back()->with('success', 'Circulation Rule updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update Circulation Rule: ' . $e->getMessage());
        }
    }

    public function get_recent_checkouts()
    {
        $data = Circulation::with(['item_physical_copy.item', 'borrower'])
            ->orderByDesc('id')
            ->limit(10)
            ->whereNull('returned_at')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'barcode' => $c->item_physical_copy->barcode ?? 'N/A',
                'title' => $c->item_physical_copy->item->name ?? 'Untitled',
                'borrower_name' => $c->borrower->name ?? 'Unknown',
                'due_at' => $c->due_at,
                'returned_at' => $c->returned_at,
                'borrowed_at' => $c->borrowed_at,
                'withdrawn' => $c->item_physical_copy->withdrawn ?? false,
                'item_lost' => $c->item_lost ?? false,
                'damaged' => $c->item_physical_copy->damaged ?? false,
            ]);

        return response()->json($data);
    }
    public function get_recent_checkins()
    {
        $data = Circulation::with(['item_physical_copy.item', 'borrower'])
            ->orderByDesc('id')
            ->limit(10)
            ->whereNotNull('returned_at')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'barcode' => $c->item_physical_copy->barcode ?? 'N/A',
                'title' => $c->item_physical_copy->item->name ?? 'Untitled',
                'borrower_name' => $c->borrower->name ?? 'Unknown',
                'borrower_card_number' => $c->borrower->card_number ?? 'Unknown',
                'due_at' => $c->due_at,
                'returned_at' => $c->returned_at,
                'borrowed_at' => $c->borrowed_at,
                'withdrawn' => $c->item_physical_copy->withdrawn ?? false,
                'item_lost' => $c->item_lost ?? false,
                'damaged' => $c->item_physical_copy->damaged ?? false,
            ]);

        return response()->json($data);
    }


    public function recover($id)
    {
        $circulation_rule = Circulation::withTrashed()->findOrFail($id); // 👈 include soft-deleted Circulation Rule
        $circulation_rule->restore(); // restores deleted_at to null
        return redirect()->back()->with('success', 'Circulation Rule recovered successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Circulation $circulation_rule)
    {
        // if ($user->image) {
        //     ImageHelper::deleteImage($user->image, 'assets/images/users');
        // }

        $circulation_rule->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Circulation Rule deleted successfully.');
    }
}
