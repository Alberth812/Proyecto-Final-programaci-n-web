<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Concierto;
use Illuminate\Http\Request;

class ConciertoController extends Controller
{
    // Obtener todos los conciertos
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Concierto::all()
        ]);
    }

    // Crear un nuevo concierto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string',
            'artista' => 'required|string',
            'fecha_evento' => 'required|date',
            'hora' => 'required|string',
            'lugar' => 'required|string',
            'precio_boleto' => 'required|numeric',

            // Ya no se envía 'boletos_disponibles', se calcula abajo
            //'boletos_disponibles' => 'required|integer',

            'categoria' => 'required|string',
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',

            // Nuevos campos para boletos por categoría (opcionales)
            'boletos_vip' => 'nullable|integer|min:0',
            'boletos_platino' => 'nullable|integer|min:0',
            'boletos_plata' => 'nullable|integer|min:0',
            'boletos_oro' => 'nullable|integer|min:0',
            'boletos_general' => 'nullable|integer|min:0',
        ]);

        // Si no envían boletos por categoría, poner 0
        $validated['boletos_vip'] = $validated['boletos_vip'] ?? 0;
        $validated['boletos_platino'] = $validated['boletos_platino'] ?? 0;
        $validated['boletos_plata'] = $validated['boletos_plata'] ?? 0;
        $validated['boletos_oro'] = $validated['boletos_oro'] ?? 0;
        $validated['boletos_general'] = $validated['boletos_general'] ?? 0;

        // Calcular total boletos disponibles
        $validated['boletos_disponibles'] = 
            $validated['boletos_vip'] +
            $validated['boletos_platino'] +
            $validated['boletos_plata'] +
            $validated['boletos_oro'] +
            $validated['boletos_general'];

        $concierto = Concierto::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Concierto creado exitosamente',
            'data' => $concierto
        ]);
    }

    // Mostrar un concierto específico
    public function show($id)
    {
        $concierto = Concierto::find($id);

        if (!$concierto) {
            return response()->json([
                'success' => false,
                'message' => 'Concierto no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $concierto
        ]);
    }

    // Actualizar un concierto
    public function update(Request $request, $id)
    {
        $concierto = Concierto::find($id);

        if (!$concierto) {
            return response()->json([
                'success' => false,
                'message' => 'Concierto no encontrado'
            ], 404);
        }

        $validated = $request->validate([
            'titulo' => 'required|string',
            'artista' => 'required|string',
            'fecha_evento' => 'required|date',
            'hora' => 'required|string',
            'lugar' => 'required|string',
            'precio_boleto' => 'required|numeric',
            //'boletos_disponibles' => 'required|integer',
            'categoria' => 'required|string',
            'imagen' => 'nullable|string',
            'descripcion' => 'nullable|string',

            'boletos_vip' => 'nullable|integer|min:0',
            'boletos_platino' => 'nullable|integer|min:0',
            'boletos_plata' => 'nullable|integer|min:0',
            'boletos_oro' => 'nullable|integer|min:0',
            'boletos_general' => 'nullable|integer|min:0',
        ]);

        $validated['boletos_vip'] = $validated['boletos_vip'] ?? 0;
        $validated['boletos_platino'] = $validated['boletos_platino'] ?? 0;
        $validated['boletos_plata'] = $validated['boletos_plata'] ?? 0;
        $validated['boletos_oro'] = $validated['boletos_oro'] ?? 0;
        $validated['boletos_general'] = $validated['boletos_general'] ?? 0;

        // Calcular total boletos disponibles
        $validated['boletos_disponibles'] = 
            $validated['boletos_vip'] +
            $validated['boletos_platino'] +
            $validated['boletos_plata'] +
            $validated['boletos_oro'] +
            $validated['boletos_general'];

        $concierto->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Concierto actualizado correctamente',
            'data' => $concierto
        ]);
    }

    // Eliminar un concierto
    public function destroy($id)
    {
        $concierto = Concierto::find($id);

        if (!$concierto) {
            return response()->json([
                'success' => false,
                'message' => 'Concierto no encontrado'
            ], 404);
        }

        $concierto->delete();

        return response()->json([
            'success' => true,
            'message' => 'Concierto eliminado correctamente'
        ]);
    }
}
