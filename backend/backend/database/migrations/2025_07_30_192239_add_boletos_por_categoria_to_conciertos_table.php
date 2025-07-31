<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('conciertos', function (Blueprint $table) {
        $table->integer('boletos_vip')->default(0);
        $table->integer('boletos_platino')->default(0);
        $table->integer('boletos_plata')->default(0);
        $table->integer('boletos_oro')->default(0);
        $table->integer('boletos_general')->default(0);
    });
}

public function down()
{
    Schema::table('conciertos', function (Blueprint $table) {
        $table->dropColumn([
            'boletos_vip',
            'boletos_platino',
            'boletos_plata',
            'boletos_oro',
            'boletos_general',
        ]);
    });
}
};
