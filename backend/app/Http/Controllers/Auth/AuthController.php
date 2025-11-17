<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if(!Auth::attempt($credentials)){
            return response()->json(['success' => false, 'message' => 'Credenciais inválidas'], 401);            
        }
        $token = $request->user()->createToken('api-token')->plainTextToken;
        return response()->json([
            'success' => true,
            'message' => 'Login realizado com sucesso.',
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso.'
        ]);
    }
}