<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Carrito;

class CarritoController extends Controller
{
    public function agregarAsiento(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|integer|exists:usuarios,id',
            'concierto_id' => 'required|integer|exists:conciertos,id',
            'zona' => 'required|string',
            'fila' => 'required|string',
            'numero_asiento' => 'required|integer',
        ]);

        $carrito = Carrito::create([
            'usuario_id' => $request->usuario_id,
            'concierto_id' => $request->concierto_id,
            'zona' => $request->zona,
            'fila' => $request->fila,
            'numero_asiento' => $request->numero_asiento,
        ]);

        return response()->json([
            'mensaje' => 'Asiento agregado al carrito correctamente',
            'carrito' => $carrito
        ], 201);
    }
}
