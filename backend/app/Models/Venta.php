<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = 'ventas';

    protected $fillable = [
        'usuario_id',
        'concierto_id',
        'cantidad_boletos',
        'total_pagado',
        'fecha_compra',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'id');
    }

    public function detalles()
    {
        return $this->hasMany(DetalleVenta::class, 'venta_id', 'id');
    }
}
