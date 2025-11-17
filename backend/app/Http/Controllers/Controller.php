<?php

namespace App\Http\Controllers;
/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Marcenaria API",
 *     description="Documentação da API da Marcenaria usando Laravel + Sanctum + Swagger",
 *     @OA\Contact(
 *         email="suporte@marcenaria.com"
 *     )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Use o token gerado no login como Bearer Token" *  
 * )
 */
abstract class Controller
{
    //
}
