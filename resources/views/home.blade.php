@extends('layouts.app')

@section('content')

<div>
    <nav class="navbar navbar-expand-md navbar-light bg-white  shadow-sm web">
        <p id="welcome"> <img id="logo" src="{{asset('img/logo.png')}}" alt=""> Bienviendos</p>
        <div class="container">


            <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <!-- <ul class="navbar-nav mr-auto">

                </ul> -->

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            <span id="user"> <i class="fa far fa-user"></i> {{ Auth::user()->email }}</span> <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="root">
        <p class="text-center mt-5"><i class="fa fa-spinner fa-spin fa-5x fa-fw"> <span class="sr-only">Cargando...</span></i>
        </p>

    </div>

    @endsection