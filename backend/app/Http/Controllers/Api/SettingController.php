<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        return SettingResource::collection(Setting::paginate(10));
    }

    public function store(SettingRequest $request)
    {
        $setting = Setting::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Configuração criada com sucesso.',
            'data' => $setting
        ], 200);
    }

    public function show(Setting $setting)
    {
        return new SettingResource($setting);
    }
    
    public function update(SettingRequest $request, Setting $setting)
    {
        $setting->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Configuração atualizada com sucesso.',
            'data' => $setting
        ], 201);
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();
        return response()->json(null, 204);
    }
}
