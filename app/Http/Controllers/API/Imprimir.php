<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class Imprimir extends Controller
{
    public function download(Request $request)
    {
        //$pdf= App::make('dompdf.wrapper');
        $orden_cod = $request->input('orden_cod');
        $pedido= $this->get_pedidos_detalle($orden_cod);
        $cabecera= $this->get_pedidos_cabecera($orden_cod);
       // return json_encode($pedido);
        $data = [
            'pedidos' => $pedido,
            'cabecera' => $cabecera
        ];
        //return view('orden_compras', $data);

        // //$pdf->loadHTML('<p>hola</p>');
        // //$pdf->loadView('orden_compras');
        $pdf = PDF::loadView('orden_compras', $data);

        // //return $pdf->download('archivo.pdf');
        return $pdf->stream();

        // foreach (($pedido) as $key => $value) {
        //     var_dump($value->merca_descr);
        //     # code...
        // }
    }

    public function get_pedidos_detalle($id_orden){
      
            $pedidos= DB::table('orden_compras as o')
            ->select('*',  DB::raw('precioc * cantidad  as total'))
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('pedido_detalle as pd', 'pd.pedido_cod_pedido', '=', 'p.cod_pedido')
            ->join('mercaderia as m', 'm.mercaderia_cod', '=', 'pd.mercaderia_mercaderia_cod')
            ->where('o.orden_cod',$id_orden )
            //->paginate(1);
            ->get();
            return $pedidos;
        
    }

    public function get_pedidos_cabecera($id_orden){
      
        $pedidos= DB::table('orden_compras as o')
        ->select('*')
        ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
        ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
        ->where('o.orden_cod',$id_orden )
        //->paginate(1);
        ->get();
        return $pedidos;
    
}
}
