<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductosController extends Controller
{
    public function get_productos()
    {
        $productos = DB::table('mercaderia')
            ->join('proveedor', 'proveedor.cod_prov', '=', 'mercaderia.cod_provedor')
            ->select('*')
            ->paginate(15);
        return response()->json($productos);
    }

    public function create(Request $request)
    {
        
        DB::table('mercaderia')->insert([
            'merca_descr' => $request->input('merca_descr'),
            'merc_preciov' => $request->input('merc_preciov'),
            'precioc' => $request->input('precioc'),
            'cod_prov' => $request->input('cod_prov'),
        ]);

        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;

        return $response;
    }

    public function update(Request $request)
    {
        //var_dump($request->input('mercaderia_cod'));
        $mercaderia =    DB::table('mercaderia')->where('mercaderia_cod', $request->input('mercaderia_cod'))->update([
            'merca_descr' => $request->input('merca_descr'),
            'merc_preciov' => $request->input('merc_preciov'),
            'precioc' => $request->input('precioc'),
            'cod_prov' => $request->input('cod_prov'),
          ]);
        if ($mercaderia != '') {
            $response['message'] = "Actualizo exitosamente";
            $response['success'] = true;
        } else {
            $response['message'] = "No se Actualizo";
            $response['success'] = false;
           // var_dump($mercaderia);
        }
        // respesta de JSON


        return $response;
    }

    public function delete(Request $request)
    {

        // eliminar los datos
        DB::table('mercaderia')->where('mercaderia_cod', $request->input('mercaderia_cod'))->delete();

        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;

        return $response;
    }
}
