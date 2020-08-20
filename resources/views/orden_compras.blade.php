<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto</title>


    <!-- Scripts -->

    <!--En caso de activar los css de personalido descomentar css/app.css -->

    <!-- <link href="css/app.css" rel="stylesheet"> -->

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/pdf.css" rel="stylesheet">
</head>

<body>
    <div class="">
        <h1 class="m-5 ml-3 text-align">Notas de Orden de Compras </h1>
        <div class="cabecera">
            <div class="row">
                @foreach($cabecera as $key => $value)
                <div class="col-sm">
                    <p><b>Fecha de Orden :</b> {{$value->fechaorden}} </p>
                </div>
                <div class="col-sm">
                    <p><b>Fecha de Pedido :</b>{{$value->ped_fecha}}</p>
                </div>
                <div class="col-sm">
                    <p><b>Proveedor :</b> {{$value->prov_descr}}</p>
                </div>
                <div class="col-sm">
                    <p><b>Estado Orden :</b> {{$value->estado_orden}}</p>
                </div>
                <div class="col-sm">
                    <p><b>Proveedor Direccion :</b> {{$value->prov_direcc}}</p>
                </div>
                @endforeach
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
                    <td>{{$datos->merca_descr}}</td>
                    <td>{{$datos->cantidad}}</td>
                    <td>{{$datos->precioc}}</td>
                    <td>{{$datos->total}}</td>

                </tr>
                @endforeach
            </tbody>
        </table>

    </div>
</body>

</html>