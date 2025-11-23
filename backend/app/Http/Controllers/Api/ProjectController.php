<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    /**
     * @OA\Get(
     *     path="/api/projects",
     *     summary="Lista todos os projetos",
     *     tags={"Projects"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de projetos"
     *     )
     * )
     */
    public function index()
    {
        return ProjectResource::collection(Project::paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/projects",
     *     summary="Cria um novo projeto",
     *     tags={"Projects"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title","slug"},
     *             @OA\Property(property="title", type="string", example="Projeto Teste"),
     *             @OA\Property(property="slug", type="string", example="projeto-teste"),
     *             @OA\Property(property="description", type="string", example="Descrição do projeto"),
     *             @OA\Property(property="category", type="string", example="Móveis"),
     *             @OA\Property(property="materials", type="string", example="Madeira maciça"),
     *             @OA\Property(property="is_published", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Projeto criado com sucesso"
     *     )
     * )
     */
    public function store(ProjectRequest $request)
    {
        $this->authorize('create', Project::class);
        $data = array_merge($request->validated(),[
            'user_id'=>auth()->id()
        ]);
        $project = Project::create($data);
        return response()->json([
            'success' => true,
            'message' => 'Projeto criado com sucesso.',
            'data' => $project
        ], 201);
    }
    
    /**
     * @OA\Get(
     *     path="/api/projects/{id}",
     *     summary="Exibe um projeto específico",
     *     tags={"Projects"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do projeto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Projeto encontrado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Projeto não encontrado"
     *     )
     * )
     */
    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
    
    /**
     * @OA\Put(
     *     path="/api/projects/{id}",
     *     summary="Atualiza um projeto",
     *     tags={"Projects"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do projeto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Projeto Atualizado"),
     *             @OA\Property(property="description", type="string", example="Nova descrição")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Projeto atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Projeto não encontrado"
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/projects/{id}",
     *     summary="Exclui um projeto",
     *     tags={"Projects"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do projeto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Projeto excluído com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Projeto não encontrado"
     *     )
     * )
     */
    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return response()->json(null, 204);
    }
}
