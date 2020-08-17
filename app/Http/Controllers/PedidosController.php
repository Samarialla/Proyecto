<?php

namespace App\Http\Controllers;

use App\PedidosModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PedidosController extends Controller
{
    public function get_pedidos()
    {
        $productos = DB::table('pedido as p')
            ->join('pedido_detalle as pd', 'p.cod_pedido', '=', 'pd.pedido_cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->select(
                '*',
                DB::raw("group_concat(merca_descr separator ' - ') as mercaderia"),
                DB::raw(" CASE ped_estado
            WHEN 'Activo' THEN 'blue'
            when 'Anulado' then 'red'
            ELSE 'green'
            END AS color")
            )
            ->groupBy('p.cod_pedido')
            ->paginate(15);
        return response()->json($productos);
    }
    public function create(Request $request)
    {
        $id = Auth::id(); // captura el dia del usuarrio logeado    
        $datos = $request->input('mercaderia');
        $cod_pedido = $request->input('cod_pedido');
        $cod_pedido_pedido = $request->input('cod_pedido_pedido');

        if ($cod_pedido == '' || $cod_pedido == null) {
            $pedido =   PedidosModel::insert([
                'proveedor_cod_prov' => $request->input('proveedor_cod_prov'),
                'ped_estado' => 'ACTIVO',
                'users_id' => $id,
                //'datos_mercaderia' => $datos
            ]);
            $codigo = PedidosModel::pluck('cod_pedido')->last();
            $pedido_detalle =    DB::table('pedido_detalle')->insert([
                'mercaderia_mercaderia_cod' => $datos,
                'cantidad' => $request->input('cantidad'),
                'pedido_cod_pedido' =>  $codigo,
            ]);
            if ($pedido != '' || $pedido != null && $pedido_detalle != null) {
                $response['message'] = "Actualizo exitosamente";
                $response['success'] = true;
                $response['insertid'] = $codigo;
            } else {
                $response['message'] = "No se Actualizo";
                $response['success'] = false;
            }
        } else {
            $pedido_detalle =    DB::table('pedido_detalle')->insert([
                'mercaderia_mercaderia_cod' => $datos,
                'cantidad' => $request->input('cantidad'),
                'pedido_cod_pedido' =>  $cod_pedido_pedido==''?$cod_pedido:$cod_pedido_pedido,
            ]);
            if ($pedido_detalle != null) {
                $response['message'] = "Actualizo exitosamente el detalle";
                $response['success'] = true;
                //$response['insertid'] = $codigo;
            } else {
                $response['message'] = "No se Actualizo";
                $response['success'] = false;
            }
        }
        return $response;
    }

    public function lista_detalle(Request $request)
    {
        
        $id_pedido = $request->input('cod_pedido_pedido')=='undefined'? $request->input('cod_pedido'):$request->input('cod_pedido_pedido');
        $cod_pedido = $request->input('cod_pedido');
        $productos = DB::table('pedido_detalle  as pd')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->select('*',  DB::raw('m.precioc * pd.cantidad AS total_pr'))->where('pd.pedido_cod_pedido',  $id_pedido)->get();
        return response()->json($productos);

        // return response()->json($productos);

    }


    public function delete(Request $request)
    {

        // eliminar los datos
        DB::table('pedido_detalle')->where('ped_det_cod', $request->input('ped_det_cod'))->delete();

        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;

        return $response;
    }

    public function delete_pedido(Request $request)
    {

        $pedidos =    DB::table('pedido')->where('cod_pedido', $request->input('cod_pedido_pedido'))->update([
            'ped_estado' => 'ANULADO',
          ]);
        if ($pedidos != '') {
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
    
}
