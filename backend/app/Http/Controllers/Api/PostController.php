<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{

    public function index()
    {
        return PostResource::collection(Post::paginate(10));
    }

    public function store(PostRequest $request)
    {
        $post = Post::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Postagem criada com sucesso.',
            'data' => $post
        ], 201);
    }
    
    public function show(Post $post)
    {
        return new PostResource($post);
    }
    
    public function update(PostRequest $request, Post $post)
    {
        $post->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Postagem atualizada com sucesso.',
            'data' => $post
        ], 200);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204);
    }
}
