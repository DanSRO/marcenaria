<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;

class ServiceController extends Controller
{

    public function index()
    {
        return ServiceResource::collection(Service::paginate(10));
    }

    public function store(ServiceRequest $request)
    {
        $service = Service::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Serviço criado com sucesso.',
            'data' => $service
        ], 201);
    }

    public function show(Service $service)
    {
        return new ServiceResource($service);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $service->update($request->validated());
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
