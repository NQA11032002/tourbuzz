<?php

use App\Http\Controllers\api\auth\AuthController;
use App\Http\Controllers\api\common\Address_travelController;
use App\Http\Controllers\api\common\DistrictController;
use App\Http\Controllers\api\common\Province_cityController;
use App\Http\Controllers\api\common\TownController;
use App\Http\Controllers\api\common\Type_travelController;
use App\Http\Controllers\api\common\VehiclesController;
use App\Http\Controllers\api\social\PostsController;
use App\Http\Controllers\api\social\User_ConnectController;
use App\Http\Controllers\api\social\UserController;
use App\Http\Controllers\api\tour\Tour_bookingController;
use App\Http\Controllers\api\tour\ToursController;
use App\Http\Controllers\api\tour\Tour_commentsController;

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

Route::prefix('social')->name('social.')->group(function () {
    Route::get('users', [UserController::class, "index"])->middleware('auth:sanctum')->name('index');
    Route::get('users/{id}', [UserController::class, "show"])->middleware('auth:sanctum')->name('detail');
    Route::get('users-search', [UserController::class, "searchUsers"])->middleware('auth:sanctum')->name('searchUsers');
    Route::post('users', [UserController::class, "create"])->middleware('auth:sanctum')->name('create');
    Route::patch('users/{id}', [UserController::class, "update"])->middleware('auth:sanctum')->name('update');
    Route::delete('users/{id}', [UserController::class, "destroy"])->middleware('auth:sanctum')->name('destroy');

    Route::prefix('posts')->name('posts.')->middleware('auth:sanctum')->group(function () {
        Route::get('/', [PostsController::class, "index"])->name('index');
        Route::get('/{name}', [PostsController::class, "index"])->name('search');
        Route::post('/', [PostsController::class, "create"])->name('create');
        Route::post('/favorite', [PostsController::class, "favorite"])->name('favorite');
        Route::patch('/{id}', [PostsController::class, "update"])->name('update');
        Route::delete('/{id}', [PostsController::class, "destroy"])->name('destroy');
    });

    Route::prefix('comments')->name('comments.')->middleware('auth:sanctum')->group(function () {
        Route::get('/', [PostsController::class, "getComments"])->name('getComments');
        Route::post('/', [PostsController::class, "comment"])->name('comment');
        Route::delete('/{id}', [PostsController::class, "deleteComment"])->name('deleteComment');
    });

    Route::prefix('comment-reply')->name('comments.')->middleware('auth:sanctum')->group(function () {
        Route::get('/', [PostsController::class, 'getCommentReply'])->name('getCommentReply');
        Route::post('/', [PostsController::class, 'commentReply'])->name('commentReply');
    });

    Route::prefix('friends')->name('friends.')->middleware('auth:sanctum')->group(function () {
        Route::get('/', [User_ConnectController::class, "getFriends"])->name('getFriends');
        Route::get('/{user_id}', [User_ConnectController::class, "getMessenger"])->name('getMessenger');
        Route::post('/', [User_ConnectController::class, "insertMessenger"])->name('insertMessenger');
    });

    Route::get('/vehicles', [VehiclesController::class, "index"])->name('vehicles');
});

Route::post('/upload', [PostsController::class, "uploadImages"])->name('upload-images');
Route::post('/uploadTour', [ToursController::class, "uploadImages"])->name('upload-images');


Route::prefix('tour')->name('tour.')->group(function () {
    Route::get('/', [ToursController::class, "index"])->name('index');
    Route::get('/popular', [ToursController::class, "toursPopular"])->name('popular');
    Route::get('/{id}', [ToursController::class, "index"])->name('index');
    Route::post('/', [ToursController::class, "create"])->middleware('auth:sanctum')->name('create');
    Route::patch('/update/{id}', [ToursController::class, "update"])->middleware('auth:sanctum')->name('update');
    Route::delete('/delete/{id}', [ToursController::class, "destroy"])->middleware('auth:sanctum')->name('destroy');
    Route::delete('/delete-picture/{id}', [ToursController::class, "deletePicture"])->middleware('auth:sanctum');
});

Route::prefix('tour-comment')->name('tour-comment.')->group(function () {
    Route::post('/', [Tour_commentsController::class, "comments"])->name('comments');
});

Route::prefix('booking')->name('booking.')->group(function () {
    Route::get('/', [Tour_bookingController::class, "index"])->name('index');
    Route::post('/', [Tour_bookingController::class, "create"])->name('create');
    // Route::patch('/{id}', [Tour_bookingController::class, "update"])->name('update');
    Route::patch('/agree', [Tour_bookingController::class, "agreeBooking"]);
    Route::delete('/{id}', [Tour_bookingController::class, "destroy"])->name('destroy');
    Route::get('/categories-pay', [Tour_bookingController::class, "categories_pay"])->name('categories_pay');
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
    Route::get('roles', [AuthController::class, "roles"])->name('roles');
    Route::get('/logout', [AuthController::class, "logout"])->name('logout')->middleware('auth:sanctum');
    Route::get('/{id}', [AuthController::class, "getUserInformation"])->name('information');
    Route::post('register', [AuthController::class, "register"])->name('register');
    Route::patch('reset-password', [AuthController::class, "resetPassword"])->name('reset-password')->middleware('auth:sanctum');
});
