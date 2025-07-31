<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\CompradorController;
use App\Http\Controllers\Api\ConciertoController;
use App\Http\Controllers\Api\BoletoController;
use App\Http\Controllers\Api\VentaController;
use App\Http\Controllers\Api\DetalleVentaController;
use App\Http\Controllers\Api\CompraController;
use App\Http\Controllers\Api\CarritoController;
use App\Http\Controllers\Api\AsientoController;

Route::post('/login', [UsuarioController::class, 'login']);
Route::post('/registro', [UsuarioController::class, 'registro']);
Route::get('/usuario/perfil', [UsuarioController::class, 'perfil']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);

// Conciertos
Route::get('/conciertos', [ConciertoController::class, 'index']);
Route::get('/conciertos/{id}', [ConciertoController::class, 'show']);
Route::post('/conciertos', [ConciertoController::class, 'store']);
Route::put('/conciertos/{id}', [ConciertoController::class, 'update']);
Route::delete('/conciertos/{id}', [ConciertoController::class, 'destroy']);



// Boletos
Route::get('/boletos', [BoletoController::class, 'index']);
Route::post('/boletos', [BoletoController::class, 'store']);
Route::get('/boletos/{id}', [BoletoController::class, 'show']);
Route::put('/boletos/{id}', [BoletoController::class, 'update']);
Route::delete('/boletos/{id}', [BoletoController::class, 'destroy']);





// Carrito
Route::post('/carrito/agregar', [CarritoController::class, 'agregarAsiento']);
Route::get('/carrito/{usuario_id}', [CarritoController::class, 'listar']);
Route::delete('/carrito/{id}', [CarritoController::class, 'eliminar']);


Route::get('/asientos/{concierto_id}', [AsientoController::class, 'getAsientosPorConcierto']);
Route::post('/asientos', [AsientoController::class, 'agregarAsiento']);
Route::put('/asientos/{id}', [AsientoController::class, 'actualizarEstado']);

Route::post('/compra', [CompraController::class, 'realizarCompra']);
