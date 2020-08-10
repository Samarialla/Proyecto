<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgendaModel extends Model
{
    protected $table='agenda_medica';
    //protected $tableAgenda='agenda_detalle as ad';
    //protected $fillable=['agenda_cod_1','cupo', 'agen_hora_final', 'agenda_observ', 'agenda_hora_inicio', 'agent_medi_estado', 'users_id', 'datos' ];

    protected $fillable=['agend_cod_1','cupo', 'agen_hora_final', 'agenda_observ', 'agenda_hora_inicio', 'agent_medi_estado', 'users_id', 'datos' ];

    /***
     * definicion de casts de acuerdo de como este definico algun caso para realizar la consulta tomara o no el tipo de la misma si se desea realizar un subjson se den
     * indicar es que array por defecto el toma como json
     */
    protected $casts = [
        'datos' => 'array',
    ];
}
