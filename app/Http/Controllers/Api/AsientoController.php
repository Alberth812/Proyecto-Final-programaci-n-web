<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Concierto;
use App\Models\Asiento;
use App\Models\Carrito; // No olvides importar Carrito
use Illuminate\Http\Request;

class AsientoController extends Controller
{
    // Obtiene los asientos de un concierto, genera si no hay ninguno
    // y asigna valores por defecto si están vacíos
    public function getAsientosPorConcierto($concierto_id)
    {
        $concierto = Concierto::find($concierto_id);

        if (!$concierto) {
            return response()->json([
                'success' => false,
                'message' => 'Concierto no encontrado.'
            ], 404);
        }

        // Asignar valores por defecto si están vacíos
        $modificado = false;
        if (!$concierto->boletos_vip) {
            $concierto->boletos_vip = 50; $modificado = true;
        }
        if (!$concierto->boletos_platino) {
            $concierto->boletos_platino = 50; $modificado = true;
        }
        if (!$concierto->boletos_plata) {
            $concierto->boletos_plata = 100; $modificado = true;
        }
        if (!$concierto->boletos_oro) {
            $concierto->boletos_oro = 50; $modificado = true;
        }
        if (!$concierto->boletos_general) {
            $concierto->boletos_general = 500; $modificado = true;
        }
        if ($modificado) {
            $concierto->save();
        }

        // Verifica si ya hay asientos, sino genera
        $asientosCount = Asiento::where('concierto_id', $concierto_id)->count();

        if ($asientosCount === 0) {
            $this->generarAsientos($concierto);
        }

        // Recupera y devuelve todos los asientos
        $asientos = Asiento::where('concierto_id', $concierto_id)->get();

        return response()->json([
            'success' => true,
            'data' => $asientos
        ]);
    }

    public function agregarAsiento(Request $request)
    {
        $validated = $request->validate([
            'usuario_id' => 'required|integer',
            'concierto_id' => 'required|integer',
            'zona' => 'required|string',
            'fila' => 'nullable|string',
            'numero_asiento' => 'required|integer',
            'precio' => 'required|numeric',
        ]);

        $carrito = Carrito::create([
            'usuario_id' => $validated['usuario_id'],
            'concierto_id' => $validated['concierto_id'],
            'zona' => $validated['zona'],
            'fila' => $validated['fila'] ?? '',
            'numero_asiento' => $validated['numero_asiento'],
            'precio' => $validated['precio'],
            'estado' => 'pendiente', // por ejemplo, o según tu lógica
        ]);

        return response()->json([
            'success' => true,
            'data' => $carrito
        ]);
    }

    // Actualiza el estado de un asiento
    public function actualizarEstado($id, Request $request)
    {
        $asiento = Asiento::find($id);

        if (!$asiento) {
            return response()->json([
                'success' => false,
                'message' => 'Asiento no encontrado.'
            ], 404);
        }

        $request->validate([
            'estado' => 'required|string|in:disponible,ocupado',
        ]);

        $asiento->estado = $request->estado;
        $asiento->save();

        return response()->json([
            'success' => true,
            'message' => 'Estado actualizado correctamente.',
            'data' => $asiento
        ]);
    }

    // Método privado que genera asientos según la distribución del concierto
    private function generarAsientos(Concierto $concierto)
    {
        $distribucion = [
            'VIP' => $concierto->boletos_vip ?? 0,
            'Platino' => $concierto->boletos_platino ?? 0,
            'Plata' => $concierto->boletos_plata ?? 0,
            'Oro' => $concierto->boletos_oro ?? 0,
            'General' => $concierto->boletos_general ?? 0,
        ];

        $precioBasePorZona = [
            'VIP' => 2500,
            'Platino' => 1800,
            'Oro' => 1600,
            'Plata' => 1300,
            'General' => 850,
        ];

        $maxAsientosPorFila = 10;

        foreach ($distribucion as $zona => $cantidad) {
            $precio = $precioBasePorZona[$zona] ?? 1000;

            for ($i = 0; $i < $cantidad; $i++) {
                $fila = intdiv($i, $maxAsientosPorFila) + 1;
                $numero = ($i % $maxAsientosPorFila) + 1;

                Asiento::create([
                    'concierto_id' => $concierto->id,
                    'seccion' => $zona,
                    'fila' => (string)$fila,
                    'numero' => $numero,
                    'precio' => $precio,
                    'estado' => 'disponible',
                ]);
            }
        }
    }
}
