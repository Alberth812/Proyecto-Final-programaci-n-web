<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConciertoIdToCarritosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('carritos', function (Blueprint $table) {
            $table->unsignedBigInteger('concierto_id')->nullable()->after('usuario_id');

            // Si quieres que al eliminar un concierto se eliminen los carritos relacionados:
            $table->foreign('concierto_id')->references('id')->on('conciertos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('carritos', function (Blueprint $table) {
            $table->dropForeign(['concierto_id']);
            $table->dropColumn('concierto_id');
        });
    }
}
