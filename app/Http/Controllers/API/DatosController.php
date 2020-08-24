<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DatosController extends Controller
{
    public function get_proveedor()
    {
        $proveedor = DB::table('proveedor')->paginate(25);
        return response()->json($proveedor);
    }

    public function get_medicos()
    {
        $medico = DB::table('medico')->paginate(25);
        return response()->json($medico);
    }
    public function get_especialidad()
    {
        $especialidades = DB::table('especialidades')->paginate(25);
        return response()->json($especialidades);
    }
    public function get_dias()
    {
        $dias = DB::table('dias')
            ->select('dias_cod_1 AS value', 'dias_descrip AS label')
            ->paginate(25);
        return response()->json($dias);
    }

    public function modulos()
    {
        $id = Auth::id();
        $modulos = DB::table('modulos_usuarios AS mu')
            ->join('users as u', 'u.id', '=', 'mu.users_id')
            ->join('modulos as m', 'm.modulos_cod', '=', 'mu.modulos_modulos_cod')
            ->select('m.*', 'u.id', 'u.email')
            ->where('u.id', '=', $id)
            //->groupBy('m.modulos_cod')
            ->paginate(10);
        return response()->json($modulos);
    }
    public function get_mercaderia()
    {
        $mercaderia = DB::table('mercaderia')
            ->select('mercaderia_cod AS value', 'merca_descr AS label')
            //->select('*')
            ->paginate(50);
        return response()->json($mercaderia);
    }

    public function get_pedidos_compras()
    {
        $pedidos = DB::table('pedido as p')
            ->select('cod_pedido AS value', DB::raw("concat(cod_pedido,'.',pr.prov_descr, ' ', p.ped_fecha) AS label"))
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->where('ped_estado', 'Activo')
            ->paginate(50);
        return response()->json($pedidos);
    }

    public function get_proveedor_pedidos(Request $request)
    {
        $id_orden = $request->input('orden_cod');
        $accion = $request->input('accion');
        $id = $request->input('cod_pedido_pedido');
        if ($accion ==='compras') {
            $pedidos = DB::table('orden_compras as o')
                ->select('pr.prov_descr')
                ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
                ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
                ->where('o.estado_orden', 'Activo')
                ->where('o.orden_cod', $id_orden)
                ->get();
        } else {
            $pedidos = DB::table('pedido as p')
                ->select('pr.prov_descr')
                ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
                ->where('ped_estado', 'Activo')
                ->where('p.cod_pedido', $id)
                ->get();
        }
        //->paginate(1);

        return response()->json($pedidos);
    }

    public function get_orden_compras()
    {
        $orden = DB::table('orden_compras as o')
            ->select('orden_cod AS value', DB::raw("concat(orden_cod,'.',pr.prov_descr, ' ', o.fechaorden) AS label"))
            ->join('pedido as p', 'p.cod_pedido', '=', 'o.pedido_cod_pedido')
            ->join('proveedor as pr', 'pr.cod_prov', '=', 'p.proveedor_cod_prov')
            ->where('estado_orden', 'Activo')
            ->paginate(50);
        return response()->json($orden);
    }
}
