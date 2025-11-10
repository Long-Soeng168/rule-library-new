<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class FileStreamController extends Controller
{
    public function view_pdf(Request $request)
    {
        // e.g : /view-pdf?file_name=file-sample_150kB.pdf&id=29&resource=items
        $resource = $request->input('resource');
        $id = $request->input('id');
        $file_name = $request->input('file_name');

        // Optional: validate that all parameters exist
        if (!$resource || !$id || !$file_name) {
            abort(404, 'Missing required parameters.');
        }

        $fileUrl = "/stream_pdf/{$resource}/{$id}/{$file_name}";

        $item = null;
        $canDownload = false;
        $previousRoute = '/';

        if ($resource == 'items') {
            $item = Item::find($id);

            $previousRoute = "/resources/theses/{$item->id}";

            if ($item) {
                // Compare the file_status property
                $canDownload = $item->file_status === 'downloadable';
            }
        }

        return Inertia::render('ViewPDF/Index', [
            'fileUrl' => $fileUrl,
            'canDownload' => $canDownload,
            'previousRoute' => $previousRoute,
        ]);
    }

    public function stream_pdf(Request $request, $resource, $id, $file_name)
    {
        // e.g: /stream_pdf/items/29/1761882796_file-sample_150kB.pdf

        // dd($request->user());
        $filePath = public_path("assets/files/{$resource}/{$file_name}");
        // return $filePath;

        // Check if file exists
        if (!File::exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // Stream file to browser
        return Response::file($filePath, [
            'Content-Type' => 'application/pdf'
        ]);
    }
}
