<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DetalleVenta;
use App\Models\Venta;
use App\Models\Concierto;

class DetalleVentaSeeder extends Seeder
{
    public function run()
    {
        $ventas = Venta::all();
        $conciertos = Concierto::all();

        foreach ($ventas as $venta) {
            foreach ($conciertos->random(1) as $concierto) {  // 1 concierto random por venta
                DetalleVenta::create([
                    'venta_id' => $venta->id,
                    'concierto_id' => $concierto->id,
                    'cantidad' => rand(1, 3),
                    'precio_unitario' => $concierto->precio_base,
                ]);
            }
        }
    }
}
