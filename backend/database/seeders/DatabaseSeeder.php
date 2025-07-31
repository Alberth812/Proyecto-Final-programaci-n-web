<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsuarioSeeder::class,         // primero usuarios
            CompradorSeeder::class,       // después compradores (si aplica)
            ConciertoSeeder::class,       // luego conciertos
            AsientoSeeder::class,         // luego asientos porque dependen del concierto_id
            VentaSeeder::class,           // luego ventas
            DetalleVentaSeeder::class,    // luego detalles de venta
            BoletoSeeder::class,          // por último boletos
        ]);
    }
}
