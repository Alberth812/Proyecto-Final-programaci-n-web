<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('usuarios', function (Blueprint $table) {
            // Modificar la columna 'rol' para agregar 'cliente'
            $table->enum('rol', ['admin', 'vendedor', 'cliente'])->default('vendedor')->change();
        });
    }

    public function down(): void {
        Schema::table('usuarios', function (Blueprint $table) {
            // Revertir al enum original sin 'cliente'
            $table->enum('rol', ['admin', 'vendedor'])->default('vendedor')->change();
        });
    }
};
