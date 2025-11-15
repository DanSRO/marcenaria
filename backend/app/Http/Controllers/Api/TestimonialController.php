<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{

    public function index()
    {
        return response()->json(Testimonial::where('is_published', true)->paginate(10));
    }

    public function store(TestimonialRequest $request)
    {
        $testimonial = Testimonial::create($request->validate());
        return response()->json([
            'success' => true,
            'message' => 'Testemunho criado com sucesso.',
            'data' => $testimonial
        ], 201);
    }
    
    public function show(Testimonial $testimonial)
    {
        return response()->json($testimonial, 200);
    }
    
    public function update(Request $request, Testimonial $testimonial)
    {
        $testimonial = Testimonial::update($request->validate());
        return response()->json([
            'success' => true,
            'message' => 'Testemunho atualizado com sucesso.',
            'data' => $testimonial
        ], 201);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
