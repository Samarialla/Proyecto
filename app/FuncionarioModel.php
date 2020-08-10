<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FuncionarioModel extends Model
{
    protected $table='funcionario';

    protected $fillable=['fun_cod_1','fun_nombre', 'fun_apellido', 'func_telef', 'fun_cedula' ];
}
