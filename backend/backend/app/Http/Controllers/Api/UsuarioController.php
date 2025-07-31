<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    // Listar usuarios (opcional, si quieres usarlo)
    public function index()
    {
        return response()->json(Usuario::all()->makeHidden(['password']));
    }

    // Registro usuario
    public function registro(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email|unique:usuarios,correo',
            'password' => 'required|string|min:4',
            'rol' => 'required|string',
        ]);

        $usuario = Usuario::create($request->all());

        $usuario->makeHidden(['password']);
        return response()->json($usuario, 201);
    }

    // Login usuario (valida correo y password sin encriptar)
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario || $usuario->password !== $request->password) {
            return response()->json(['error' => 'Usuario o contraseña incorrectos'], 401);
        }

        $usuario->makeHidden(['password']);
        return response()->json([
            'message' => 'Login exitoso',
            'usuario' => $usuario,
        ]);
    }
}
