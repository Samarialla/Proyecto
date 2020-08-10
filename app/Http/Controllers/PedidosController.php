<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidosController extends Controller
{
    public function get_pedidos()
    {
        $productos = DB::table('pedido as p')
            ->join('pedido_detalle as pd', 'p.cod_pedido', '=', 'pd.pedido_cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->select('*',
            DB::raw("group_concat(merca_descr separator ' - ') as mercaderia"), DB::raw(" CASE ped_estado
            WHEN 'Activo' THEN 'blue'
            when 'Anulado' then 'red'
            ELSE 'green'
            END AS color")   )
            ->groupBy('p.cod_pedido')
            ->paginate(15);
        return response()->json($productos);
    }
}
