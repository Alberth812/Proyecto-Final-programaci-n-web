<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asiento;

class AsientoSeeder extends Seeder
{
    public function run()
{
    $conciertoId = 5;

    // Limpia asientos existentes de ese concierto para evitar duplicados
    Asiento::where('concierto_id', $conciertoId)->delete();

    $zonas = [
        'VIP' => 100,
        'Platino' => 150,
        'Oro' => 100,
        'Plata' => 150,
        'General' => 250,
    ];

    $precioPorZona = [
        'VIP' => 2500,
        'Platino' => 1800,
        'Oro' => 1600,
        'Plata' => 1300,
        'General' => 850,
    ];

    foreach ($zonas as $zona => $cantidad) {
        for ($i = 1; $i <= $cantidad; $i++) {
            Asiento::create([
                'concierto_id' => $conciertoId,
                'seccion' => $zona,
                'fila' => '1',  // Puedes adaptar la fila si quieres
                'numero' => $i,
                'precio' => $precioPorZona[$zona],
                'estado' => 'libre',  // o 'disponible' si tu DB lo usa así
            ]);
        }
    }
}

}
