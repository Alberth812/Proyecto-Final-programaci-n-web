<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Boleto;
use App\Models\DetalleVenta;
use Illuminate\Support\Str;

class BoletoSeeder extends Seeder
{
    public function run()
    {
        $detalles = DetalleVenta::all();

        foreach ($detalles as $detalle) {
            for ($i = 0; $i < $detalle->cantidad; $i++) {
                Boleto::create([
                    'detalle_venta_id' => $detalle->id,
                    'user_id' => $detalle->venta->user_id,
                    'concierto_id' => $detalle->concierto_id,
                    'codigo_boleto' => strtoupper(Str::random(10)),
                    'zona' => 'General',
                    'asiento' => null,
                    'fecha_compra' => now(),
                ]);
            }
        }
    }
}
