<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orden_ComprasModel extends Model
{
    protected $table='orden_compras';

    protected $fillable=['orden_cod','fechaorden', 'estado_orden', 'pedido_cod_pedido', 'users_id' ];
    protected $casts = [
        'datos_pedidos' => 'array',
    ];
}
