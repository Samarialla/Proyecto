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
        $datos = $request->input('lista_pedido');


        $pedido =   PedidosModel::insert([
            'proveedor_cod_prov' => $request->input('proveedor_cod_prov'),
            'ped_estado' => 'ACTIVO',
            'users_id' => $id
        ]);
        $codigo = PedidosModel::pluck('cod_pedido')->last();
        foreach (json_decode($datos) as $row) {
            $data=$row->mer;
            for ($i=0; $i < $d=json_encode($data->value)  ; $i++) { 
                var_dump($d[$i]['value']);
            }
            }
        
                // $pedido_detalle =    DB::table('pedido_detalle')->insert([
                //     'mercaderia_mercaderia_cod' => $field->value,
                //     'cantidad' => $field->can,
                //     'pedido_cod_pedido' =>  $codigo,
                // ]);
                //var_dump($datos[$i]);
                
            
        

        // if ($pedido != '' || $pedido != null && $pedido_detalle != null) {
        //     $response['message'] = "Actualizo exitosamente";
        //     $response['success'] = true;
        // } else {
        //     $response['message'] = "No se Actualizo";
        //     $response['success'] = false;
        // }
        // return $response;
    }

     public function prueba(){
     $datos=   '[{"id":1,"pro":"1","mer":{"value":1,"label":"CABLE"},"cant":"123"},{"id":2,"pro":"1","mer":{"value":2,"label":"PELO"},"cant":"12"}]';
     foreach(json_decode($datos) as $v){
         $d= ($v->mer);
         var_dump($d[2]);
        //  foreach(($d) as $i){
        //     //var_dump(( $i));
        //  }
       
    //     foreach()
      }
    }
}
