<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ServiceController extends Controller
{
    use AuthorizesRequests;

    /**
     * @OA\Get(
     *     path="/api/services",
     *     summary="Lista todos os serviços",
     *     tags={"Services"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de serviços"
     *     )
     * )
     */
    public function index()
    {
        $this->authorize('viewAny', Service::class);
        return ServiceResource::collection(Service::paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/services",
     *     summary="Cria um novo serviço",
     *     tags={"Services"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","slug"},
     *             @OA\Property(property="name", type="string", example="Nome do Serviço"),
     *             @OA\Property(property="slug", type="string", example="serviço-teste"),
     *             @OA\Property(property="description", type="string", example="Descrição do serviço"),
     *             @OA\Property(property="icon", type="string", example="Ícone"),
     *             @OA\Property(property="is_published", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Serviço criado com sucesso"
     *     ) 
     * )
     */
    public function store(ServiceRequest $request)
    {
        $this->authorize('create', Service::class);
        $service = Service::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Serviço criado com sucesso.',
            'data' => $service
        ], 201);
    }
    
    /**
     * @OA\Get(
     *     path="/api/services/{id}",
     *     summary="Exibe um serviço específico",
     *     tags={"Services"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do serviço",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Serviço encontrado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Serviço não encontrado"
     *     )
     * )
     */ 
    public function show(Service $service)
    {
        $this->authorize('view', $service);
        return new ServiceResource($service);
    }
    
    /**
     * @OA\Put(
     *     path="/api/services/{id}",
     *     summary="Atualiza um serviço",
     *     tags={"Services"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do serviço",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Nome Atualizado"),
     *             @OA\Property(property="description", type="string", example="Nova descrição")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Serviço atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Serviço não encontrado"
     *     )
     * )
     */ 
    public function update(ServiceRequest $request, Service $service)
    {
        $this->authorize('update', $service);
        $service->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Serviço atualizado com sucesso.',
            'data' =>  $service
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/services/{id}",
     *     summary="Exclui um serviço",
     *     tags={"Services"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do serviço",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Serviço excluído com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Serviço não encontrado"
     *     )
     * )
     */
    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);
        $service->delete();
        return response()->json(null, 204);
    }
}
