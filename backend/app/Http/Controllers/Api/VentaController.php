<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Venta;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller
{
    // Listar todas las ventas con usuario, detalles y boletos
    public function index()
    {
        $ventas = Venta::with(['usuario', 'detalles.concierto', 'detalles.boletos'])->get();

        return response()->json($ventas);
    }

    // Mostrar una venta específica por id con sus relaciones
    public function show($id)
    {
        $venta = Venta::with(['usuario', 'detalles.concierto', 'detalles.boletos'])->find($id);

        if (!$venta) {
            return response()->json(['error' => 'Venta no encontrada'], 404);
        }

        return response()->json($venta);
    }

    // Crear una venta (sin detalles ni boletos, para eso usa CompraController o similar)
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:usuarios,id',
            'total' => 'required|numeric|min:0',
            'fecha_venta' => 'nullable|date',
        ]);

        $venta = Venta::create([
            'user_id' => $request->user_id,
            'total' => $request->total,
            'fecha_venta' => $request->fecha_venta ?? now(),
        ]);

        return response()->json($venta, 201);
    }

    // Actualizar datos básicos de una venta
    public function update(Request $request, $id)
    {
        $venta = Venta::find($id);
        if (!$venta) {
            return response()->json(['error' => 'Venta no encontrada'], 404);
        }

        $request->validate([
            'total' => 'sometimes|numeric|min:0',
            'fecha_venta' => 'sometimes|date',
        ]);

        if ($request->has('total')) {
            $venta->total = $request->total;
        }
        if ($request->has('fecha_venta')) {
            $venta->fecha_venta = $request->fecha_venta;
        }

        $venta->save();

        return response()->json($venta);
    }

    // Eliminar una venta
    public function destroy($id)
    {
        $venta = Venta::find($id);
        if (!$venta) {
            return response()->json(['error' => 'Venta no encontrada'], 404);
        }

        $venta->delete();

        return response()->json(['mensaje' => 'Venta eliminada correctamente']);
    }
}
