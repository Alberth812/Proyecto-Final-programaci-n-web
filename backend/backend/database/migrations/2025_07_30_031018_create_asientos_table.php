<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('concierto_id');
            $table->string('seccion');
            $table->string('fila');
            $table->integer('numero');
            $table->decimal('precio', 8, 2);
            $table->enum('estado', ['disponible', 'ocupado'])->default('disponible');
            $table->timestamps();

            $table->foreign('concierto_id')->references('id')->on('conciertos')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asientos');
    }
};

