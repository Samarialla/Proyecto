<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::user() == null) {
        return view('auth/login');
    } else {
        return view('home');
    }
});

Auth::routes();

/**
 * se define las rutas a ser utlizadas
 * 
 * 
*/

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/funcionario','FuncionarioController@get_all')->name('funcionario');
Route::post('/funcionario/insert','FuncionarioController@create')->name('funcionario');
Route::post('/funcionario/update','FuncionarioController@update')->name('funcionario');
Route::post('/funcionario/delete','FuncionarioController@delete')->name('funcionario');
/******************************************************************************************* */





/***************************************Consultas varias***************************************** */

Route::get('/proveedor','API\DatosController@get_proveedor')->name('proveedor');
Route::get('/medicos','API\DatosController@get_medicos')->name('medico');
Route::get('/especialidades','API\DatosController@get_especialidad')->name('especialidad');
Route::get('/dias','API\DatosController@get_dias')->name('dias');
Route::get('/mercaderia','API\DatosController@get_mercaderia')->name('mercaderia');
Route::get('/modulos','API\DatosController@modulos')->name('modulos');
Route::get('/pedidos_compras','API\DatosController@get_pedidos_compras')->name('pedidos');
Route::post('/pedidos_compras_proveedor','API\DatosController@get_proveedor_pedidos')->name('pedidos');



/*********************************************************************************************** */
Route::get('/productos','ProductosController@get_productos')->name('productos');
Route::post('/productos/insert','ProductosController@create')->name('productos');
Route::post('/productos/update','ProductosController@update')->name('productos');
Route::post('/productos/delete','ProductosController@delete')->name('productos');

/*************************************************************************** */

Route::get('/agenda','AgendaController@getAgenda')->name('agenda');
Route::post('/agenda/insert','AgendaController@create')->name('agenda');
Route::post('/agenda/update','AgendaController@update')->name('agenda');
Route::post('/agenda/delete','AgendaController@delete')->name('agenda');


/**
 * para realizar las pruebas
 * 
 */
Route::get('/prueba','PedidosController@prueba')->name('agenda');

/**
 * rutas de pedidos de compras
 * 
 * 
 * 
 */

Route::get('/pedidos','PedidosController@get_pedidos')->name('pedidos');
Route::post('/pedidos/insert','PedidosController@create')->name('pedidos');
Route::post('/pedidos/get_detalle','PedidosController@lista_detalle')->name('pedidos');
Route::post('/pedidos/delete_detalle','PedidosController@delete')->name('pedidos');
Route::post('/pedidos/delete_pedido','PedidosController@delete_pedido')->name('pedidos');

/**
 * 
 * rutas de orden de compras
 * 
 */
Route::get('/ordenes','Orden_ComprasController@get_ordenCompras')->name('ordenes_compras');
Route::post('/ordenes/insert','Orden_ComprasController@create')->name('ordenes_compras');
Route::post('/ordenes/update','Orden_ComprasController@update')->name('ordenes_compras');