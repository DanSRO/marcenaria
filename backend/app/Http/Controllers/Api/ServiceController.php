<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    public function index()
    {
        return response()->json(Service::where('is_published', true)->paginate(10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'slug'=>'required|string|max:255|unique:services',
            'description'=>'nullable|string',
            'icon'=>'nullable|string|max:100',
            'is_published'=>'boolean',
        ]);
        $service = Service::create($validated);
        return response()->json($service, 201);
    }

    public function show(Service $service)
    {
        return response()->json($service, 200);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name'=>'sometimes|string|max:255',
            'slug'=>'sometimes|string|max:255|unique:services',
            'description'=>'nullable|string',
            'icon'=>'nullable|string|max:100',
            'is_published'=>'boolean',
        ]);
        $service->update($validated);
        return response()->json($service, 200);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(null, 204);
    }
}
