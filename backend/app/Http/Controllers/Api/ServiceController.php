<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    public function index()
    {
        return response()->json(Service::where('is_published', true)->paginate(10));
    }

    public function store(Request $request)
    {
        $service = Service::create($request->validate());
        return response()->json([
            'success' => true,
            'message' => 'Serviço criado com sucesso.',
            'data' => $service
        ], 201);
    }

    public function show(Service $service)
    {
        return response()->json($service, 200);
    }

    public function update(Request $request, Service $service)
    {
        $service->update($request->validate());
        return response()->json([
            'success' => true,
            'message' => 'Serviço atualizado com sucesso.',
            'data' =>  $service
        ], 200);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(null, 204);
    }
}
