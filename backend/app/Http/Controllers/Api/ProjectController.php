<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Http\Requests\ProjectRequest;

class ProjectController extends Controller
{

    public function index()
    {
        return response()->json(Project::where('is_published', true)->paginate(10));
    }

    public function store(ProjectRequest $request)
    {
        $project = Project::create($request->validate());
        return response()->json([
            'success' => true,
            'data' => $project
        ], 201);
    }

    public function show(Project $project)
    {
        return response()->json($project, 200);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $project->update($request->validate());
        return response()->json([
            'success' => true,
            'data' => $project
        ], 200);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
