<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/funcionario','FuncionarioController@get_all');
Route::post('/funcionario/insert','FuncionarioController@create');
Route::post('/funcionario/update','FuncionarioController@update');
Route::post('/funcionario/delete','FuncionarioController@delete');
/***************************************************************** */
Route::get('/proveedor','API\DatosController@get_proveedor');
Route::get('/productos','ProductosController@get_productos');
Route::post('/productos/insert','ProductosController@create');
Route::post('/productos/update','ProductosController@update');
Route::post('/productos/delete','ProductosController@delete');