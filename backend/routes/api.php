<?php

use App\Http\Controllers\api\auth\AuthController;
use App\Models\vehicles;
use App\Http\Controllers\api\social\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('social')->name('social.')->middleware('auth:sanctum')->group(function () {
    Route::get('users', [UserController::class, "index"])->name('index');
    Route::get('users/{id}', [UserController::class, "show"])->name('detail');
    Route::post('users', [UserController::class, "create"])->name('create');
    Route::patch('users/{id}', [UserController::class, "update"])->name('update');
    Route::delete('users/{id}', [UserController::class, "destroy"])->name('destroy');
});

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('login', [AuthController::class, "login"])->name('login');
});
