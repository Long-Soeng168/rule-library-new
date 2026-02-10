<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\FileHelper;
use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Language;
use App\Models\ItemCategory;
use App\Models\ItemFile;
use App\Models\ItemImage;
use App\Models\ItemMainCategory;
use App\Models\ItemPhysicalCopy;
use App\Models\ItemType;
use App\Models\Library;
use App\Models\Location;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class ItemPhysicalCopyController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:item view', only: ['index', 'show']),
            new Middleware('permission:item create', only: ['create', 'store']),
            new Middleware('permission:item update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:item delete', only: ['destroy', 'destroy_image']),
        ];
    }

    public function create(string $item_id, Request $request)
    {
        $item = Item::findOrFail($item_id);
        return Inertia::render('Admin/ItemPhysicalCopy/Create', [
            'itemRecord' => $item,
            'itemTypes' => ItemType::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'shelfLocations' => Location::where('type_code', 'shelf-location')->orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'libraries' => Library::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id'               => 'required|exists:items,id',
            'barcode'               => 'required|string|max:255|unique:item_physical_copies,barcode',
            'full_call_number'      => 'nullable|string|max:255',
            'inventory_number'      => 'nullable|string|max:255',

            'public_note'           => 'nullable|string',
            'unpublic_note'         => 'nullable|string',

            // Validating against the 'code' column in related tables
            'shelf_location_code'   => 'nullable|string|exists:locations,code',
            'item_type_code'        => 'required|string|exists:item_types,code',
            'home_library_code'     => 'required|string|exists:libraries,code',
            'current_library_code'  => 'required|string|exists:libraries,code',

            // Koha Flags
            'not_for_loan'          => 'integer|min:0|max:9',
            'item_lost'             => 'integer|min:0|max:9',
            'withdrawn'             => 'integer|min:0|max:1',
            'damaged'               => 'integer|min:0|max:1',
        ]);

        try {
            $validated['created_by'] = $request->user()->id;
            $validated['updated_by'] = $request->user()->id;

            ItemPhysicalCopy::create($validated);

            return redirect()->back()->with('success', 'Physical copy created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create: ' . $e->getMessage()]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        // dd($item->loadCount('category'));
        return Inertia::render('Admin/Item/Show', [
            'showData' => $item->loadCount('category')->load('images', 'files', 'authors', 'publisher', 'language'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $item_id, string $physical_copy_id, Request $request)
    {
        $item = Item::findOrFail($item_id);
        $editData = ItemPhysicalCopy::findOrFail($physical_copy_id);
        return Inertia::render('Admin/ItemPhysicalCopy/Create', [
            'editData' => $editData,
            'itemRecord' => $item,
            'itemTypes' => ItemType::orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'shelfLocations' => Location::where('type_code', 'shelf-location')->orderBy('order_index')
                ->orderBy('name')
                ->get(),
            'libraries' => Library::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function update(string $item_id, string $physical_copy_id, Request $request)
    {
        $editData = ItemPhysicalCopy::findOrFail($physical_copy_id);

        $validated = $request->validate([
            'item_id'               => 'required|exists:items,id',
            // BUG FIX: Ignore current ID in unique check
            'barcode'               => 'required|string|max:255|unique:item_physical_copies,barcode,' . $editData->id,

            'full_call_number'      => 'nullable|string|max:255',
            'inventory_number'      => 'nullable|string|max:255',

            'public_note'           => 'nullable|string',
            'unpublic_note'         => 'nullable|string',

            'shelf_location_code'   => 'nullable|string|exists:locations,code',
            'item_type_code'        => 'required|string|exists:item_types,code',
            'home_library_code'     => 'required|string|exists:libraries,code',
            'current_library_code'  => 'required|string|exists:libraries,code',

            'not_for_loan'          => 'integer|min:0|max:9',
            'item_lost'             => 'integer|min:0|max:9',
            'withdrawn'             => 'integer|min:0|max:1',
            'damaged'               => 'integer|min:0|max:1',
        ]);

        try {
            // Track updater
            $validated['updated_by'] = $request->user()->id;

            $editData->update($validated);

            return redirect()->back()->with('success', 'Physical copy updated successfully!');
        } catch (\Exception $e) {
            // Correcting error redirection format
            return redirect()->back()->withErrors(['error' => 'Failed to update: ' . $e->getMessage()]);
        }
    }


    public function recover($id)
    {
        // $item = Item::withTrashed()->findOrFail($id); // 👈 include soft-deleted Item
        // $item->restore(); // restores deleted_at to null
        // return redirect()->back()->with('success', 'Item recovered successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Item deleted successfully.');
    }
}
