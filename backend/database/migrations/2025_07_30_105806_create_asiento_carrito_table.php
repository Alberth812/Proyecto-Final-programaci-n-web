<?php

// database/migrations/xxxx_xx_xx_create_asiento_carrito_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsientoCarritoTable extends Migration
{
    public function up()
    {
        Schema::create('asiento_carrito', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('carrito_id');
            $table->unsignedBigInteger('asiento_id');
            $table->timestamps();

            $table->foreign('carrito_id')->references('id')->on('carritos')->onDelete('cascade');
            $table->foreign('asiento_id')->references('id')->on('asientos')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('asiento_carrito');
    }
}
