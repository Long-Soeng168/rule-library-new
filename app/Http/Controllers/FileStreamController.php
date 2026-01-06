<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FileStreamController extends Controller
{
    public function view_pdf(Request $request)
    {
        // e.g : /view-pdf?file_name=file-sample_150kB.pdf&id=29&resource=items
        $resource = $request->input('resource');
        $id = $request->input('id');
        $file_name = $request->input('file_name');
        $is_download  = (int) $request->input('is_download', 0);

        // Optional: validate that all parameters exist
        if (!$resource || !$id || !$file_name) {
            abort(404, 'Missing required parameters.');
        }

        $fileUrl = "/stream_pdf/{$resource}/{$id}/{$file_name}";

        $item = null;
        $canDownload = true;
        $previousRoute = '/';

        if ($resource == 'items') {
            $item = Item::find($id);

            $previousRoute = "/resources/theses/{$item->id}";

            // if ($item) {
            //     $canDownload = $item->file_status === 'downloadable';
            // }
        }

        if ($is_download === 1) {
            if (!$canDownload) {
                abort(403, 'This file is not downloadable.');
            }

            $filePath = public_path("assets/files/{$resource}/{$file_name}");

            if (!File::exists($filePath)) {
                return response()->json(['error' => 'File not found'], 404);
            }

            $extension = pathinfo($file_name, PATHINFO_EXTENSION);

            $baseName = strtolower($item->name);        // lower case
            $baseName = str_replace(' ', '_', $baseName); // spaces → _

            $downloadName = $baseName . '.' . $extension;

            return response()->download(
                $filePath,
                $downloadName
            );
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
