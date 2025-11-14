<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function index()
    {
        return response()->json(Project::where('is_published', true)->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'materials' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string',
            'gallery' => 'nullable|json',
            'is_published' => 'boolean', 
        ]);
        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return response()->json($project, 200);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:projects,slug,' . $project->id,
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'materials' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string',
            'gallery' => 'nullable|json',
            'is_published' => 'boolean',
        ]);
        $project->update($validated);
        return response($project, 200);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
