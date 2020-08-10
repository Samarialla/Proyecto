import React, { useState } from 'react';
import Productos from './Productos';
import Bienvenido from './Bienvenido';
import Clientes from "./Clientes";
import AgendaMedica from './agendaMedica/AgendaMedica';
/**
 * no se utilizar mas por las mejoras que se van a realizar para obtener los modulos de
 * la base de datos 
 * 
 */
const Principal = () => {
    const [componente, setcomponente] = useState(false);
    const [bienvenido, setbienvenido] = useState(<Bienvenido />);
    const [componenteProducto, setcomponenteProducto] = useState(false);
    const [componenteAgenda, setcomponenteAgenda] = useState(false);
    const ver = () => {
        setcomponente(<Clientes />);
        setcomponenteProducto(false);
        setbienvenido(false);
        setcomponenteAgenda(false)

    }
    const verProductos = () => {
        setcomponente(false);
        setcomponenteProducto(<Productos />);
        setbienvenido(false);
        setcomponenteAgenda(false)
    }
    const verAgenda = () => {
        setcomponente(false);
        setcomponenteAgenda(<AgendaMedica />);
        setbienvenido(false);
        setcomponenteProducto(false);
        
    }

    return (
        <>
            <div className='row'>
                <div className='col-lg-2 dashboard'>
                    <div className='col-lg-12'>
                        {/* <Menu /> */}
                        {/* 
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#" onClick={() => ver()}> <i className=" fa far fa-user m-2"></i>Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#"> <i className="fa fa-bath"></i>Disabled</a>
                            </li>
                        </ul> */}

                        <ul className="nav flex-column">
                            <li className="nav-item" >Referenciales
                             <ul>
                                    <a className="nav-link active" href="#" onClick={() => ver()}> <i className=" fa far fa-user m-1"></i>Clientes</a>
                                    <a className="nav-link active" href="#" onClick={() => verProductos()}> <i className=" fa fa-apple m-1"></i>Productos</a>
                                </ul>
                            </li>
                            <li className="nav-item">Agendamiento
                                 <ul>
                                 <a className="nav-link active" href="#" onClick={() => verAgenda()}> <i className="fa fa-address-card m-1"></i>Agenda Medica</a>
                                    <li>FadeIn/FadeOUT</li>
                                </ul>
                            </li>
                            <li className="nav-item">DOM
                                 <ul>
                                    <li>append/prepend</li>
                                    <li>before/after</li>
                                </ul>
                            </li>
                            <li className="nav-item">Travensing
                                 <ul>
                                    <li>parents/parent</li>
                                    <li>children/find</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-9 principal'>
                    <div id='secundario'>
                        {bienvenido}
                        {componente}
                        {componenteProducto}
                        {componenteAgenda}

                    </div>
                </div>

            </div>
        </>
    );

}

export default Principal;




