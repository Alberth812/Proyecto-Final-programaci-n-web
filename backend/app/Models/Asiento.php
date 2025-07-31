<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asiento extends Model
{
protected $fillable = ['concierto_id', 'seccion', 'fila', 'numero', 'precio', 'estado'];

    public function concierto()
    {
        return $this->belongsTo(Concierto::class);
    }
}
