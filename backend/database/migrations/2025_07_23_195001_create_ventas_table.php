<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();

            // Relación con usuarios (quien compró)
            $table->foreignId('usuario_id')
                ->constrained('usuarios')
                ->onDelete('cascade');

            // Relación con conciertos
            $table->foreignId('concierto_id')
                ->constrained('conciertos')
                ->onDelete('cascade');

            $table->integer('cantidad_boletos');         // Cuántos boletos compró
            $table->decimal('total_pagado', 8, 2);       // Total pagado por todos los boletos
            $table->dateTime('fecha_compra');            // Cuándo se hizo la compra

            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down(): void {
        Schema::dropIfExists('ventas');
    }
};
