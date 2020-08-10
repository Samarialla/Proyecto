<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\AgendaModel;
use Illuminate\Support\Facades\Auth;

use function GuzzleHttp\json_decode;

class AgendaController extends Controller
{
    public function getAgenda(Request $request)
    {

        $agenda = AgendaModel::select(
            "agenda_medica.agend_cod_1",
            "agenda_medica.cupo",
            "agenda_medica.agent_medi_estado",
            DB::raw("DATE_FORMAT(agenda_medica.agen_hora_final, '%H:%i:%s') as final_agenda"),
            DB::raw("DATE_FORMAT(agenda_medica.agenda_hora_inicio, '%H:%i:%s') as agenda_hora_inicio"),
            "agenda_observ",
            "m.medico_cod_1",
            DB::raw("CONCAT(medic_nombre, ' ', medic_apellido)  as medicos"),
            DB::raw("(SELECT  GROUP_CONCAT(dias_descrip SEPARATOR ' - ')  FROM agenda_detalle AS a JOIN
            dias d1 ON d1.dias_cod_1 = a.dias_dias_cod_1 where a.agenda_medica_agend_cod_1=agenda_medica.agend_cod_1
            GROUP BY agenda_medica_agend_cod_1) as diasDoctor"),
            "e.espec_cod_1",
            "e.espec_descrip",
            "datos",
        )
            ->join('agenda_detalle as ad', 'ad.agenda_medica_agend_cod_1', '=', 'agenda_medica.agend_cod_1')
            ->join('especialidades as e', 'e.espec_cod_1', '=', 'ad.especialidades_espec_cod_1')
            ->join('medico as m', 'm.medico_cod_1', '=', 'ad.medico_medico_cod_1')
            ->join('dias as d', 'd.dias_cod_1', '=', 'ad.dias_dias_cod_1')
            //->where('a.agent_medi_estado', '=', 'Activo')
            ->groupBy('agenda_medica.agend_cod_1')
            ->paginate(15);
        return response()->json($agenda);
    }
    /****
     * $codigo=AgendaModel::pluck('agend_cod_1)->last()
     * esto captura el ultimo registro inserta
     * 
     * 
     */

    public function create(Request $request)
    {
        $id = Auth::id(); // captura el dia del usuarrio logeado    
        $datos = $request->input('datos');


        $agenda =   AgendaModel::insert([
            'cupo' => $request->input('cupo'),
            'agen_hora_final' => $request->input('agen_hora_final'),
            'agenda_observ' => $request->input('agenda_observ'),
            'agenda_hora_inicio' => $request->input('agenda_hora_inicio'),
            'agent_medi_estado' => $request->input('agent_medi_estado'),
            'users_id' => $id,
            'datos' => $request->input('datos'),
            'medico_medico_cod_1' => $request->input('medico_medico_cod_1'),
            'especialidades_espec_cod_1' => $request->input('especialidades_espec_cod_1'),

        ]);
        $codigo = AgendaModel::pluck('agend_cod_1')->last();
        foreach (json_decode($datos) as $row) {
            $agenda_detalle =    DB::table('agenda_detalle')->insert([
                'dias_dias_cod_1' => $row->value,
                'agenda_medica_agend_cod_1' => $codigo,
                'medico_medico_cod_1' => $request->input('medico_medico_cod_1'),
                'especialidades_espec_cod_1' => $request->input('especialidades_espec_cod_1'),
            ]);
        }


        if ($agenda != '' || $agenda != null && $agenda_detalle != null) {
            $response['message'] = "Actualizo exitosamente";
            $response['success'] = true;
        } else {
            $response['message'] = "No se Actualizo";
            $response['success'] = false;
        }
        return $response;
    }
    public function update(Request $request)
    {
        $id = Auth::id(); // captura el dia del usuarrio logeado
        $datos = $request->input('datos');
        $agenda =    DB::table('agenda_medica')->where('agend_cod_1', $request->input('agend_cod_1'))->update([
            'cupo' => $request->input('cupo'),
            'agen_hora_final' => $request->input('agen_hora_final'),
            'agenda_observ' => $request->input('agenda_observ'),
            'agenda_hora_inicio' => $request->input('agenda_hora_inicio'),
            'agent_medi_estado' => $request->input('agent_medi_estado'),
            'users_id' => $id,
            'datos' => $request->input('datos'),
            'medico_medico_cod_1' => $request->input('medico_medico_cod_1'),
            'especialidades_espec_cod_1' => $request->input('especialidades_espec_cod_1'),
        ]);
        /**
         * eliminamos para poder volver a realizar la insersion 
         */
        DB::table('agenda_detalle')->where('agenda_medica_agend_cod_1', $request->input('agend_cod_1'))->delete();
        foreach (json_decode($datos) as $row) {
            $agenda_detalle =    DB::table('agenda_detalle')->insert([
                'dias_dias_cod_1' => $row->value,
                'agenda_medica_agend_cod_1' => $request->input('agend_cod_1'),
                'medico_medico_cod_1' => $request->input('medico_medico_cod_1'),
                'especialidades_espec_cod_1' => $request->input('especialidades_espec_cod_1'),
            ]);
        }


        //dd($request->input('datos'));
        if ($agenda != '' && $agenda != null && $agenda_detalle != null) {
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
        DB::table('agenda_medica')->where('agend_cod_1', $request->input('agend_cod_1'))->delete();

        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;

        return $response;
    }
}
