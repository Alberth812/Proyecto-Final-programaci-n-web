<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ConciertoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('conciertos')->insert([
            [
                'titulo' => 'Concierto de Rock Alternativo',
                'artista' => 'Bandas Locales',
                'fecha_evento' => '2024-08-15',
                'lugar' => 'Auditorio Nacional',
                'precio_boleto' => 450.00,
                'boletos_disponibles' => 500,
                'imagen' => 'https://via.placeholder.com/300x200.png?text=Rock+Alternativo',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titulo' => 'Festival de Música Electrónica',
                'artista' => 'DJ Top Latinoamérica',
                'fecha_evento' => '2024-09-10',
                'lugar' => 'Foro Sol',
                'precio_boleto' => 700.00,
                'boletos_disponibles' => 800,
                'imagen' => 'https://via.placeholder.com/300x200.png?text=Electronica',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'titulo' => 'Noche de Salsa en Vivo',
                'artista' => 'Orquesta Habana',
                'fecha_evento' => '2024-08-30',
                'lugar' => 'Teatro Metropolitán',
                'precio_boleto' => 350.00,
                'boletos_disponibles' => 300,
                'imagen' => 'https://via.placeholder.com/300x200.png?text=Salsa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
