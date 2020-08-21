<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
                DB::raw("group_concat(p.cod_pedido,'.',pr.prov_descr,' ', p.ped_fecha) AS datos_proveedores"),
                DB::raw(" CASE estado_com
            WHEN 'ACTIVO' THEN 'blue'
            when 'ANULADO' then 'red'
            ELSE 'green'
            END AS color", 'p.users_id')
            )
            ->groupBy('o.orden_cod')
            ->paginate(15);
        return response()->json($orden);
    }
}
