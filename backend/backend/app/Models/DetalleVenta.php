<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DetalleVenta extends Model
{
    protected $table = 'detalles_venta';
    protected $fillable = ['venta_id', 'concierto_id', 'cantidad', 'precio_unitario'];

    public function venta(): BelongsTo
    {
        return $this->belongsTo(Venta::class);
    }

    public function concierto(): BelongsTo
    {
        return $this->belongsTo(Concierto::class);
    }

    public function boletos(): HasMany
    {
        return $this->hasMany(Boleto::class);
    }
}
