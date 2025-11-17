<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/posts",
     *     summary="Lista todos as postagens",
     *     tags={"Posts"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de postagens"
     *     )
     * )
     */
    public function index()
    {
        return PostResource::collection(Post::paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/posts",
     *     summary="Cria uma nova postagem",
     *     tags={"Posts"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title","slug"},
     *             @OA\Property(property="title", type="string", example="Projeto Teste"),
     *             @OA\Property(property="slug", type="string", example="projeto-teste"),
     *             @OA\Property(property="content", type="string", example="Conteúdo da postagem"),
     *             @OA\Property(property="cover_image", type="string", example="Url da imagem"),
     *             @OA\Property(property="tags", type="string", example="Tags da postagem"),
     *             @OA\Property(property="is_published", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Postagem criada com sucesso"
     *     ) 
     * )
     */
    public function store(PostRequest $request)
    {
        $this->authorize('create', Post::class);
        $post = Post::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Postagem criada com sucesso.',
            'data' => $post
        ], 201);
    }
    
    /**
     * @OA\Get(
     *     path="/api/posts/{id}",
     *     summary="Exibe uma postagem específica",
     *     tags={"Posts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da postagem",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Postagem encontrada"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Postagem não encontrada"
     *     )
     * )
     */    
    public function show(Post $post)
    {
        return new PostResource($post);
    }
    
    /**
     * @OA\Put(
     *     path="/api/posts/{id}",
     *     summary="Atualiza uma postagem",
     *     tags={"Posts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da postagem",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Postagem Atualizada"),
     *             @OA\Property(property="content", type="string", example="Novo conteúdo")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Postagem atualizada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Postagem não encontrada"
     *     )
     * )
     */    
    public function update(PostRequest $request, Post $post)
    {
        $this->authorize('update', $post);
        $post->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Postagem atualizada com sucesso.',
            'data' => $post
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/posts/{id}",
     *     summary="Exclui uma postagem",
     *     tags={"Posts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da postagem",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Postagem excluída com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Postagem não encontrada"
     *     )
     * )
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return response()->json(null, 204);
    }
}
