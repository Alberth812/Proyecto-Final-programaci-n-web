<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Asiento;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\Concierto; // Importar modelo Concierto
use Illuminate\Support\Facades\DB;

class CompraController extends Controller
{
    /**
     * Realiza la compra de los asientos seleccionados para un concierto.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function realizarCompra(Request $request)
    {
        // Validar los datos de entrada
        $datos = $request->validate([
            'usuario_id' => 'required|integer',
            'concierto_id' => 'required|integer',
            'asientos' => 'required|array',
            'asientos.*.id' => 'required|integer',
            'asientos.*.precio' => 'required|numeric',
        ]);

        // Validar que el concierto exista
        $concierto = Concierto::find($datos['concierto_id']);
        if (!$concierto) {
            return response()->json([
                'success' => false,
                'message' => "El concierto con id {$datos['concierto_id']} no existe.",
            ], 404);
        }

        // Iniciar transacción para asegurar atomicidad
        DB::beginTransaction();

        try {
            // Calcular el total sumando precios de los asientos
            $total = collect($datos['asientos'])->sum('precio');

            // Crear registro de la venta
            $venta = Venta::create([
                'usuario_id' => $datos['usuario_id'],
                'concierto_id' => $datos['concierto_id'],
                'cantidad_boletos' => count($datos['asientos']),
                'total_pagado' => $total,
                'fecha_compra' => now(),
            ]);

            // Procesar cada asiento
            foreach ($datos['asientos'] as $asientoData) {
                $asiento = Asiento::findOrFail($asientoData['id']);

                // Verificar si el asiento ya está vendido
                if ($asiento->estado === 'vendido') {
                    // Revertir transacción y devolver error 409 Conflict
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "El asiento {$asiento->id} ya fue vendido.",
                    ], 409);
                }

                // Actualizar estado del asiento a vendido
                $asiento->estado = 'vendido';
                $asiento->save();

                // Crear detalle de venta para el asiento
                DetalleVenta::create([
                    'venta_id' => $venta->id,
                    'asiento_id' => $asiento->id,
                    'precio' => $asientoData['precio'],
                ]);
            }

            // Confirmar transacción
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Compra realizada con éxito.',
                'venta_id' => $venta->id,
            ]);
        } catch (\Exception $e) {
            // En caso de error, revertir transacción
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al realizar la compra.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
