<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\Setting;

class SettingController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/settings",
     *     summary="Lista todas as chaves e valores",
     *     tags={"Settings"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de chaves e valores"
     *     )
     * )
     */
    public function index()
    {        
        return SettingResource::collection(Setting::paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/settings",
     *     summary="Cria chave e valor",
     *     tags={"Settings"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title","slug"},
     *             @OA\Property(property="key", type="string", example="Chave Teste"),
     *             @OA\Property(property="valor", type="string", example="valor-teste")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Chave/valor criado com sucesso"
     *     ) 
     * )
     */  
    public function store(SettingRequest $request)
    {
        $this->authorize('create', Setting::class);
        $setting = Setting::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Configuração criada com sucesso.',
            'data' => $setting
        ], 200);
    }
    
    /**
     * @OA\Get(
     *     path="/api/settings/{id}",
     *     summary="Exibe chave/valor específico",
     *     tags={"Settings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da setting",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Chave/valor encontrada"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Chave/valor não encontrada"
     *     )
     * )
     */ 
    public function show(Setting $setting)
    {        
        return new SettingResource($setting);
    }
    
    /**
     * @OA\Put(
     *     path="/api/settings/{id}",
     *     summary="Atualiza uma chave/valor",
     *     tags={"Settings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da chave/valor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="key", type="string", example="Chave Atualizada"),
     *             @OA\Property(property="value", type="string", example="Novo valor")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Chave/valor atualizada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Chave/valor não encontrada"
     *     )
     * )
     */     
    public function update(SettingRequest $request, Setting $setting)
    {
        $this->authorize('update', $setting);
        $setting->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Configuração atualizada com sucesso.',
            'data' => $setting
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/settings/{id}",
     *     summary="Exclui uma chave/valor",
     *     tags={"Settings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da chave/valor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Chave/valor excluída com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Chave/valor não encontrada"
     *     )
     * )
     */
    public function destroy(Setting $setting)
    {
        $this->authorize('delete', $setting);
        $setting->delete();
        return response()->json(null, 204);
    }
}
