<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('conciertos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('artista');
            $table->date('fecha_evento');
            $table->string('hora'); // hora del evento
            $table->string('lugar');
            $table->decimal('precio_boleto', 8, 2);
            $table->integer('boletos_disponibles');
            $table->string('imagen')->nullable();
            $table->text('descripcion')->nullable(); // descripción del evento
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conciertos');
    }
};

