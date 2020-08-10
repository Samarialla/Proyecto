<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FuncionarioModel;
use Illuminate\Support\Facades\DB;

class FuncionarioController extends Controller
{
  public function get_all(Request $request)
  {
    $funcionario = DB::table('funcionario')->paginate(15);
    return response()->json($funcionario);
  }


  public function create(Request $request)
  {

    DB::table('funcionario')->insert([
      'fun_nombre' => $request->input('fun_nombre'),
      'fun_apellido' => $request->input('fun_apellido'),
      'func_telef' => $request->input('func_telef'),
      'fun_cedula' => $request->input('fun_cedula'),
      'fun_direccion' => $request->input('fun_direccion'),
    ]);

    $response['message'] = "Guardo exitosamente";
    $response['success'] = true;

    return $response;
  }

  public function update(Request $request)
  {

    // inserta los datos
    DB::table('funcionario')->where('fun_cod_1', $request->input('fun_cod_1'))->update([
      'fun_nombre' => $request->input('fun_nombre'),
      'fun_apellido' => $request->input('fun_apellido'),
      'func_telef' => $request->input('func_telef'),
      'fun_cedula' => $request->input('fun_cedula'),
      'fun_direccion' => ($request->input('fun_direccion') === 'null') ? "" : $request->input('fun_direccion'),
    ]);

    // respesta de JSON
    $response['message'] = "Actualizo exitosamente";
    $response['success'] = true;

    return $response;
  }

  public function delete(Request $request)
  {

    // eliminar los datos
    DB::table('funcionario')->where('fun_cod_1', $request->input('fun_cod_1'))->delete();

    // respesta de JSON
    $response['message'] = "Actualizo exitosamente";
    $response['success'] = true;

    return $response;
  }
}
