<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecadoController;

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/recados', [RecadoController::class, 'index']);

    Route::post('/recados', [RecadoController::class, 'store']);

    Route::delete('/recados/{id}', [RecadoController::class, 'destroy']);

});