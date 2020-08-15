<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Orden_ComprasController extends Controller
{
    public function get_ordenCompras()
    {
        $orden = DB::table('orden_compras as o')
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle  as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->select(
                'o.orden_cod',
                'o.fechaorden',
                'o.estado_orden',
                'p.cod_pedido',
                'p.ped_fecha',
                'p.proveedor_cod_prov',
                'pr.cod_prov',
                'pr.prov_descr',
                DB::raw("group_concat(merca_descr separator ' - ') as mercaderia"),
                DB::raw(" CASE estado_orden
            WHEN 'ACTIVO' THEN 'blue'
            when 'ANULADO' then 'red'
            ELSE 'green'
            END AS color", 'p.users_id')
            )
            ->groupBy('o.orden_cod')
            ->paginate(15);
        return response()->json($orden);
    }

    public function create(Request $request)
    {
        $id = Auth::id(); // captura el dia del usuarrio logeado    
        //$datos = $request->input('mercaderia');
        $cod_pedido = $request->input('cod_pedido');
        $orden =  DB::table('orden_compras')->insert([
            'estado_orden' => 'ACTIVO',
            'pedido_cod_pedido' => $cod_pedido,
            'users_id' => $id,
         ]);

         $pedido = DB::table('pedido')->where('cod_pedido', $cod_pedido)->update([
            'ped_estado' => 'PROCESADO',
           
         ]);

        if ($orden != null && $pedido !=null)   {
            $response['message'] = "Actualizo exitosamente";
            $response['success'] = true;
            //$response['insertid'] = $codigo;
        } else {
            $response['message'] = "No se Actualizo";
            $response['success'] = false;
        }

        return $response;
    }
}
