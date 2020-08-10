<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductosModel extends Model
{
    protected $table='mercaderia';

    protected $fillable=['mercaderia_cod','merca_descr', 'merc_preciov', 'precioc', 'cod_prov' ];
}
