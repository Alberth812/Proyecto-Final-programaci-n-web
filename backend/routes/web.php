<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API de TicketChiri 🎟️']);
});

Route::get('/login', function () {
    return response()->json(['message' => 'Por favor autentícate'], 401);
})->name('login');
