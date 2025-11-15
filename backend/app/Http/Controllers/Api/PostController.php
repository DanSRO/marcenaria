<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function index()
    {
        return response()->json(Post::where('is_published', true)->paginate(10));
    }

    public function store(PostRequest $request)
    {
        $post = Post::create($request->validate());
        return response()->json([
            'success' => true,
            'message' => 'Postagem criada com sucesso.',
            'data' => $post
        ], 201);
    }
    
    public function show(Post $post)
    {
        return $post;
    }
    
    public function update(Request $request, Post $post)
    {
        $post->update($request->validate());
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
