<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    protected $fillable = [
        'usuario_id',
        'concierto_id',
        'zona',
        'fila',
        'numero_asiento',
        'precio',
        'estado',
    ];
}
