<?php

namespace App\Exceptions;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [];
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];
    public function register(): void
    {
        //
    }
    public function render($request, Throwable $e)
    {
        if($request->expectsJson()){
            if($e instanceof ValidationException){
                return response()->json([
                    'success' => false,
                    'message' => 'Dados inválidos',
                    'errors' => $e->errors(),
                ], 422);
            }
            if($e instanceof ModelNotFoundException){
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                ], 404);
            }
            return response()->json([
                'success' => false,
                'message' => 'Erro interno no servidor',
                'details' => $e->getMessage(),
            ], 500);
        }
        return parent::render($request, $e);
    }
}
