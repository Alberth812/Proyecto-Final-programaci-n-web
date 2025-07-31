<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comprador;

class CompradorController extends Controller
{
    public function index()
    {
        return Comprador::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email|unique:compradores',
        ]);

        return Comprador::create($validated);
    }

    public function show($id)
    {
        return Comprador::findOrFail($id);
    }

    public function update(Request $request, Comprador $comprador)
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string',
            'correo' => 'sometimes|required|email|unique:compradores,correo,' . $comprador->id,
        ]);

        $comprador->update($validated);
        return $comprador;
    }

    public function destroy(Comprador $comprador)
    {
        $comprador->delete();
        return response()->json(['mensaje' => 'Comprador eliminado']);
    }
}
