<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{

    public function index()
    {
        return ProjectResource::collection(Project::paginate(10));
    }

    public function store(ProjectRequest $request)
    {
        $this->authorize('create', Project::class);
        $project = Project::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Projeto criado com sucesso.',
            'data' => $project
        ], 201);
    }
    
    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
    
    public function update(ProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);
        $project->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Projeto atualizado com sucesso.',
            'data' => $project
        ], 200);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return response()->json(null, 204);
    }
}
