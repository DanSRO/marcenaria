<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function index()
    {
        return response()->json(Post::where('is_published', true)->paginate(10));
    }

    public function store(Request $request)
    {
        $validated =  $request->validate([
            'title'=>'required|string|max:255',
            'slug'=>'required|string|max:255|unique:posts',
            'content'=>'nullable|string|max:100',
            'cover_image'=>'nullable|string',
            'tags'=>'required|string|max:255',
            'is_published'=>'boolean',
        ]);
        $post = Post::create($validated);
        return response()->json($post, 201);
    }

    public function show(Post $post)
    {
        return $post;
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
        'title'=>'sometimes|string|max:255',
        'slug'=>'sometimes|string|max:255|unique:posts, slug,'.$post->id,
        'content'=>'nullable|string|max:100',
        'cover_image'=>'nullable|string',
        'tags'=>'nullable|string|max:255',
        'is_published'=>'boolean',
        ]);
        $post->update($validated);
        return response()->json($post, 200);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204);
    }
}
