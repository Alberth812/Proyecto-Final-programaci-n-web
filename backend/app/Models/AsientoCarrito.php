<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsientoCarrito extends Model
{
    use HasFactory;

    protected $table = 'asiento_carrito';

    protected $fillable = ['carrito_id', 'asiento_id'];

    public function carrito()
    {
        return $this->belongsTo(Carrito::class);
    }

    public function asiento()
    {
        return $this->belongsTo(Asiento::class);
    }
}
