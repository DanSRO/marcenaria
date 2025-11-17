<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;;

class TestimonialController extends Controller
{

    public function index()
    {
        return TestimonialResource::collection(Testimonial::paginate(10));
    }

    public function store(TestimonialRequest $request)
    {
        $testimonial = Testimonial::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Testemunho criado com sucesso.',
            'data' => $testimonial
        ], 201);
    }
    
    public function show(Testimonial $testimonial)
    {
        return new TestimonialResource($testimonial);
    }
    
    public function update(TestimonialRequest $request, Testimonial $testimonial)
    {
        $testimonial->update($request->validated());
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
