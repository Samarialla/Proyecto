<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PedidosModel extends Model
{
    protected $table='pedido';

    protected $fillable=['cod_pedido','ped_estado', 'cod_prov', 'mercaderia', 'codigo' ];
    protected $casts = [
        'mer' => 'array',
    ];
}
