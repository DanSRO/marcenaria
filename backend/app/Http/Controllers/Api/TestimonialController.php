<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{

    public function index()
    {
        return response()->json(Testimonial::where('is_published', true)->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name'=>'required|string|max:255',
            'localization'=>'nullable|string|max:255',
            'text'=>'nullable|text|max:255',
            'rating'=>'nullable|integer',
            'photo_url'=>'nullable|string',
            'is_published'=>'boolean',
        ]);
        $testimonial = Testimonial::create($validated);
        return response()->json($testimonial, 201);
    }
    
    public function show(Testimonial $testimonial)
    {
        return response()->json($testimonial, 200);
    }
    
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'client_name'=>'sometimes|string|max:255',
            'localization'=>'sometimes|string|max:255',
            'text'=>'sometimes|text|max:255',
            'rating'=>'sometimes|integer',
            'photo_url'=>'sometimes|string',
            'is_published'=>'boolean',

        ]);
        $testimonial = Testimonial::update($validated);
        return response()->json($testimonial, 201);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
