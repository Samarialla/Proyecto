<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Imprimir extends Controller
{
    public function download(Request $request)
    {
        $orden_cod = $request->input('orden_cod');
        $pedido = $this->get_pedidos_detalle($orden_cod);
        $cabecera = $this->get_pedidos_cabecera($orden_cod);
        $data = [
            'pedidos' => $pedido,
            'cabecera' => $cabecera
        ];
        $pdf = PDF::loadView('orden_compras', $data)->setPaper('a4', 'landscape');
        return $pdf->stream();
    }

    public function get_pedidos_detalle($id_orden)
    {

        $pedidos = DB::table('orden_compras as o')
            ->select('*',  DB::raw('precioc * cantidad  as total'))
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->where('o.orden_cod', $id_orden)
            //->paginate(1);
            ->get();
        return $pedidos;
    }

    public function get_pedidos_cabecera($id_orden)
    {

        $pedidos = DB::table('orden_compras as o')
            ->select('*', DB::raw('sum(precioc * cantidad)  as total'))
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->where('o.orden_cod', $id_orden)
            //->paginate(1);
            ->get();
        return $pedidos;
    }
    /**
     * fin de immprimor orden de compras
     */

    public function downloadCompras(Request $request)
    {
        $cod = $request->input('cod_com');
        $pedido = $this->get_orden_detalle($cod);
        $cabecera = $this->get_orden_cabecera($cod);
        $data = [
            'pedidos' => $pedido,
            'cabecera' => $cabecera
        ];

        $pdf = PDF::loadView('compras', $data)->setPaper('a4', 'landscape');

        return $pdf->stream();
    }

    public function get_orden_detalle($cod)
    {

        $pedidos = DB::table('compras as c')
            ->select('*',  DB::raw('precioc * cantidad  as total'))
            ->join('orden_compras as o', 'o.orden_cod', '=', 'c.orden_cod')
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->where('c.cod_com', $cod)
            ->groupBy('pd.ped_det_cod')
            ->get();
        return $pedidos;
    }

    public function get_orden_cabecera($cod)
    {

        $pedidos = DB::table('compras as c')
            ->select('*', DB::raw('sum(precioc * cantidad)  as total'))
            ->join('orden_compras as o', 'o.orden_cod', '=', 'c.orden_cod')
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->where('c.cod_com', $cod)
            //->paginate(1);
            ->get();
        return $pedidos;
    }
}
