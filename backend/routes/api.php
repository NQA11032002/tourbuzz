<?php

use App\Http\Controllers\api\auth\AuthController;
use App\Http\Controllers\api\common\Address_travelController;
use App\Http\Controllers\api\common\DistrictController;
use App\Http\Controllers\api\common\Province_cityController;
use App\Http\Controllers\api\common\TownController;
use App\Http\Controllers\api\common\Type_travelController;
use App\Http\Controllers\api\social\PostsController;
use App\Models\vehicles;
use App\Http\Controllers\api\social\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/', [PostsController::class, "index"])->name('index');
        Route::get('/{name}', [PostsController::class, "index"])->name('search');
        Route::post('/', [PostsController::class, "create"])->name('create');
        Route::patch('/{id}', [PostsController::class, "update"])->name('update');
        Route::delete('/{id}', [PostsController::class, "destroy"])->name('destroy');
    });
});

Route::prefix('address')->name('address.')->group(function () {
    Route::get('/city', [Province_cityController::class, "index"]);
    Route::get('/district', [DistrictController::class, "index"]);
    Route::get('/town', [TownController::class, "index"]);
    Route::get('/address-travel', [Address_travelController::class, "index"]);
    Route::get('/type-travel', [Type_travelController::class, "index"]);
});

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('login', [AuthController::class, "login"])->name('login');
    Route::get('logout', [AuthController::class, "logout"])->name('logout')->middleware('auth:sanctum');
    Route::patch('reset-password', [AuthController::class, "resetPassword"])->name('reset-password')->middleware('auth:sanctum');
});
