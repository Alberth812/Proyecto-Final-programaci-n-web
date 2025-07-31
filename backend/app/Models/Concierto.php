<?php

// app/Models/Concierto.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concierto extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'artista',
        'fecha_evento',
        'hora',
        'lugar',
        'precio_boleto',
        'boletos_disponibles',
        'imagen',
        'descripcion',
        'categoria',
        'rating',

        // Nuevos campos para boletos por categoría
        'boletos_vip',
        'boletos_platino',
        'boletos_plata',
        'boletos_oro',
        'boletos_general',
    ];
}
