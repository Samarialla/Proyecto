<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto</title>


    <!-- Scripts -->

    <!--En caso de activar los css de personalido descomentar css/app.css -->

    <!-- <link href="css/app.css" rel="stylesheet"> -->

    <link type="text/css" href="css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="css/pdf.css" rel="stylesheet">

</head>

<body>
    <div class="">
        <h1 class="text-align">Notas de Orden de Compras </h1>
        <div class="cabecera">
            @foreach($cabecera as $key => $value)
            <div class="padre">
                <div class="hijo"><b>Fecha de Orden :</b> {{$value->fechaorden}}</div>
                <div class="hijo"><b>Fecha de Pedido :</b>{{$value->ped_fecha}}</div>
                <div class="hijo"><b>Proveedor :</b> {{$value->prov_descr}}</div>
                <div class="hijo"><b>Estado Orden :</b> {{$value->estado_orden}}</div>
                <div class="hijo"><b>Proveedor Direccion :</b> {{$value->prov_direcc}}</div>
            </div>
        </div>

    </div>

    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Mercaderia</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody>

            @foreach($pedidos as $key => $datos)

            <tr>
                <td>{{$key}}</td>
                <td scope="row">{{$datos->merca_descr}}</td>
                <td scope="row">{{$datos->cantidad}}</td>
                <td scope="row">{{number_format($datos->precioc)}}</td>
                <td scope="row">{{number_format($datos->total)}}</td>

            </tr>
            @endforeach
        </tbody>
        <hr>
    </table>
    <h3> El total del producto ordenado es : {{number_format($value->total)}} guaranies</h3>
    @endforeach


    </div>


</body>

</html>