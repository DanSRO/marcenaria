<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;;

class TestimonialController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/testimonials",
     *     summary="Lista todos os testemunhos",
     *     tags={"Testimonials"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de testemunhos"
     *     )
     * )
     */
    public function index()
    {        
        return TestimonialResource::collection(Testimonial::paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/testimonials",
     *     summary="Cria um novo testemunho",
     *     tags={"Testimonials"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"client_name"},
     *             @OA\Property(property="client_name", type="string", example="Nome do cliente"),
     *             @OA\Property(property="localidade", type="string", example="localidade ou cidade"),
     *             @OA\Property(property="text", type="string", example="Conteúdo do testemunho"),
     *             @OA\Property(property="rating", type="integer", example=1),
     *             @OA\Property(property="photo_url", type="string", example="Endereço da imagem"),
     *             @OA\Property(property="is_published", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Testemunho criado com sucesso"
     *     ) 
     * )
     */
    public function store(TestimonialRequest $request)
    {
        $testimonial = Testimonial::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Testemunho criado com sucesso.',
            'data' => $testimonial
        ], 201);
    }
    
    /**
     * @OA\Get(
     *     path="/api/testimonials/{id}",
     *     summary="Exibe um testemunho específico",
     *     tags={"Posts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da testemunho",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Testemunho encontrada"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Testemunho não encontrado"
     *     )
     * )
     */      
    public function show(Testimonial $testimonial)
    {
        return new TestimonialResource($testimonial);
    }
    
    /**
     * @OA\Put(
     *     path="/api/testimonials/{id}",
     *     summary="Atualiza um testimunho",
     *     tags={"Testimonials"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do testemunho",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="client_name", type="string", example="Nome do cliente"),
     *             @OA\Property(property="localization", type="string", example="Cidade ou localidade"),
     *             @OA\Property(property="text", type="string", example="Resumo da experiência")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Testemunho atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Testemunho não encontrado"
     *     )
     * )
     */    
    public function update(TestimonialRequest $request, Testimonial $testimonial)
    {
        $this->authorize('update', $testimonial);
        $testimonial->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Testemunho atualizado com sucesso.',
            'data' => $testimonial
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/testimonials/{id}",
     *     summary="Exclui um testemunho",
     *     tags={"Testimonials"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do testemunho",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Testemunho excluído com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Testemunho não encontrado"
     *     )
     * )
     */
    public function destroy(Testimonial $testimonial)
    {
        $this->authorize('delete', $testimonial);
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
