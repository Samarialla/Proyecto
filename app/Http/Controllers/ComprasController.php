<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ComprasController extends Controller
{
    public function get_Compras()
    {
        $orden = DB::table('compras as c')
        ->join('orden_compras as o', 'o.orden_cod', '=', 'c.orden_cod')
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle  as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->select('cod_com', 'num_fact_com', 'estado_com', 'fecha_com', 'c.users_id',
                'o.orden_cod',
                'o.fechaorden',
                'o.estado_orden',
                'p.cod_pedido',
                'p.ped_fecha',
                'p.proveedor_cod_prov',
                'pr.cod_prov',
                'pr.prov_descr',
                'o.datos_pedidos',
                DB::raw("group_concat(merca_descr separator ' - ') as mercaderia"),
                DB::raw("group_concat(o.orden_cod,'.',pr.prov_descr,' ', p.ped_fecha) AS datos_proveedores"),
                DB::raw(" CASE estado_com
            WHEN 'ACTIVO' THEN 'blue'
            when 'ANULADO' then 'red'
            ELSE 'green'
            END AS color", 'p.users_id')
            )
            ->groupBy('c.cod_com')
            ->paginate(15);
        return response()->json($orden);
    }

    public function lista_detalle_orden(Request $request)
    {
               
        $id_orden = $request->input('orden_cod');
        $orden = DB::table('orden_compras  as o')
        ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
        ->join('pedido_detalle as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
        ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
        ->select('*',  DB::raw('m.precioc * pd.cantidad AS total_pr'))->where('o.orden_cod',  $id_orden)->get();
        return response()->json($orden);

        // return response()->json($productos);

    }

    public function create(Request $request)
    {
        $id = Auth::id(); // captura el dia del usuarrio logeado    
        //$datos = $request->input('mercaderia');
        $orden_cod = $request->input('orden_cod');
        $factura = $request->input('factura');
        $compras =  DB::table('compras')->insert([
            'estado_com' => 'ACTIVO',
            'orden_cod' => $orden_cod,
            'users_id' => $id,
                 ]);

        $orden_actualizar = DB::table('orden_compras')->where('orden_cod', $orden_cod)->update([
            'estado_orden' => 'PROCESADO',

        ]);

        if ($compras != null && $orden_actualizar != null) {
            $response['message'] = "Actualizo exitosamente";
            $response['success'] = true;
            //$response['insertid'] = $codigo;
        } else {
            $response['message'] = "No se Actualizo";
            $response['success'] = false;
        }

        return $response;
    }

    public function update(Request $request)
    {
        $cod_orden = $request->input('orden_cod');
        $compras =    DB::table('compras')->where('cod_com', $request->input('cod_com'))->update([
            'estado_com' => 'ANULADO',
        ]);
        $orden = DB::table('orden_compras')->where('orden_cod', $cod_orden)->update([
            'estado_orden' => 'ACTIVO',

        ]);

        if ($orden != '' && $compras != '') {
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
