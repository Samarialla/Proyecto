import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';

class Pedidos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dias: '',
            pedidos: null,
            modal: false,
            formCodigo: '',
            validacion: '',
            edit: false,
            modalDelete: false,
            search: '',
            color: '',
            formProveedor: '',
            selectedOption: null,
            mercaderia: '',
            formCantidad: '',
            list: []
        };

    }

    enviarpedidos(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('proveedor_cod_prov', this.state.formProveedor)
        formData.append('lista_pedido',JSON.stringify( this.state.list))
        if (this.state.formProveedor != '' &&  this.state.list != '') {
            axios.post('/pedidos/insert', formData).then(response => {
                if (response.data.success == true) {
                    this.setState({ modal: false })
                    this.getdata();
                }
            }).catch(error => {
                console("Error " + error);
            })
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }
    //edicion de pedidos
    // enviarEditpedidos(event) {
    //     event.preventDefault();
    //     const formData = new FormData()
    //     formData.append('agend_cod_1', this.state.formCodigo)
    //     formData.append('cupo', this.state.formCupo)
    //     formData.append('agen_hora_final', this.state.formHoraFinal)
    //     formData.append('pedidos_observ', this.state.formapedidosObser)
    //     formData.append('pedidos_hora_inicio', this.state.formapedidosHoraInicio)
    //     formData.append('agent_medi_estado', this.state.formpedidosEstado)
    //     formData.append('datos', JSON.stringify(this.state.selectedOption))
    //     formData.append('medico_medico_cod_1', this.state.formpedidosMedico)
    //     formData.append('especialidades_espec_cod_1', this.state.formEspec)
    //     if (this.state.formapedidosHoraInicio != '' && this.state.formCupo != '' && this.state.formHoraFinal != ''  && this.state.selectedOption != '') {
    //         axios.post('/pedidos/update', formData).then(response => {
    //             if (response.data.success == true) {
    //                 this.setState({ modal: false })
    //                 this.getdata();
    //             }
    //         }).catch(error => {
    //             console.log("Error " + error);
    //         })
    //     } else {
    //         this.setState({ validacion: 'Campo obligatorio' })
    //     }
    // }
    // enviarDeletepedidos(event) {
    //     event.preventDefault();
    //     const formData = new FormData()
    //     formData.append('agend_cod_1', this.state.formCodigo)

    //     if (this.state.formCodigo != '') {
    //         axios.post('/pedidos/delete', formData).then(response => {
    //             if (response.data.success == true) {
    //                 this.setState({ modalDelete: false })
    //                 this.getdata();
    //             }
    //         }).catch(error => {
    //             console.log("Error " + error);
    //         })
    //     } else {
    //         this.setState({ validacion: 'Campo obligatorio' })
    //     }
    // }


    //carga  los datos al renderizar el componente
    async componentDidMount() {
        await this.getdata();
        await this.getdataProveedor();
        await this.getdataMercaderia();

    }

    //obtenemos los datos de uri
    async getdata(pageNumber = 1) {
        const url = `/pedidos?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ pedidos: response.data })
            //console.log(response.data)

        }).catch(error => {
            alert("Error " + error)
        })
    }
    //obtenemos el proveedor

    async getdataProveedor() {
        const url = '/proveedor';
        Axios.get(url).then(response => {
            this.setState({ proveedores: response.data })

        }).catch(error => {
            alert("Error " + error)
        })
    }
    async getdataMercaderia() {
        const url = '/mercaderia';
        Axios.get(url).then(response => {
            this.setState({ mercaderia: response.data })

        }).catch(error => {
            alert("Error " + error)
        })
    }

    cargarComboProveedor() {
        const { data, current_page, per_page, total, to, from } = this.state.proveedores;
        return (
            <>
                {data.map((prov, index) => {
                    return (<option key={index} value={prov.cod_prov}>{prov.prov_descr}</option>)
                })}
            </>
        )

    }

    /// si no se le asgina el stare por defecto a una constante a realizar render el componente no encuentra el data de la api
    render() {
        const { pedidos } = this.state;
        const { modal } = this.state;
        const { modalDelete } = this.state;
        const { proveedores } = this.state;
        const { selectedOption } = this.state;
        const { data, current_page, per_page, total, to, from } = this.state.mercaderia;
        const { codigo, producto, cantidad, list } = this.state;


        const handleChangeOption = selectedOption => {
            this.setState({ selectedOption });
        };


        // para realizar la busqueda
        const buscador = e => {
            this.setState({ search: e.target.value });
        };



        // abre el modal
        const handleOpenModal = (event) => {
            event.preventDefault();
            this.setState({ modal: true });

        }

        //cierra el modal
        const handleCloseModal = event => {
            event.preventDefault();
            // se limpia para state para evitar error al cerrar o abrir el modal
            this.setState(
                {
                    modal: false,
                    formCodigo: '',
                    validacion: '',
                    edit: false,
                    modalDelete: false,
                    formpedidosEstado: '',
                    formCantidad:'',
                    selectedOption:null,
                    list: []

                })
        }

        // escucha a los values
        const handleChangeProveedor = (event) => {
            this.setState({ formProveedor: event.target.value });
        }
        const handleChangeCantidad = (event) => {
            this.setState({ formCantidad: event.target.value });
        }
        const agregarProducto = (event) => {
            event.preventDefault();
            //console.log(event);
            // Para que no se refresque la página por el onSubmit del formulario
            // ;
            const { tour, pax, price, list } = this.state;
            const pro = this.state.formProveedor;
            const mer = this.state.selectedOption;
            const cant = this.state.formCantidad


            // Simple validación para que tour, pax y price sean campos requeridos
            if (this.state.formProveedor != '' && this.state.selectedOption != '' && this.state.formCantidad != '') {
                const id = list.length + 1;
                // En los states se agrega un nuevo objeto a "list"
                // y se reinicia el estado de tour, pax y price
                this.setState({
                    list: [...list, { id, pro, mer, cant }],
                    formCantidad: '',
                    selectedOption: ''

                });
                //console.log(this.state.list);
            } else {
                //   // Si alguno de los inputs se encuentra vacio
                //   // se mostrará el siguiente mensaje en la consola del navegador
                console.log('Please complete all fields');
            }


        }



        return (

            <>
                <div className="container">
                    <div className='row'>
                        <h1>Pedidos de Compras</h1>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='m-1'>
                            <button className='btn btn-success' onClick={(event) => handleOpenModal(event)}>+ Nuevo Producto</button>
                        </div>
                        <div className='offset-md-5 col-lg -10'>
                            <input className="form-control col-lg -10" label="search" icon="search" type="text" onChange={buscador}
                                placeholder="Buscar pedidos de compras"></input>
                        </div>
                    </div>
                    {pedidos && this.renderList()}
                </div>
                <div className='modal_pedidos'>
                    <Modal visible={modal} onClickBackdrop={handleCloseModal} dialogClassName='modal-dialog modal-lg'>

                        <div className="modal-header ">
                            {this.state.edit ? <h1>Editar pedidos</h1> : <h1>Nuevo pedidos</h1>}
                        </div>
                        <div className="modal-body">
                            <form className='container'>
                                <div>
                                    <div className='form-group'>
                                        <label>Proveedor *</label>

                                        <select name="prov_descr" className="form-control " value={this.state.formProveedor} onChange={handleChangeProveedor}>
                                            <option></option>
                                            {proveedores && this.cargarComboProveedor()}
                                        </select>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>

                                <div className='form-group'>
                                    <div>
                                        <label>Mercaderia *</label>

                                        <Select
                                            value={selectedOption}
                                            onChange={handleChangeOption}
                                            options={data}
                                            isSearchable
                                            placeholder='Busqueda de Mercaderia'
                                        />
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <div>
                                    <label>Cantidad *</label>
                                </div>
                                <div >
                                    <div>
                                        <input type='number' className='form-control' value={this.state.formCantidad} onChange={handleChangeCantidad} required></input>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <div className="pax_btn">
                                    <button type="" onClick={(event) => agregarProducto(event)} className="btn btn-primary">Agregar</button>
                                </div>
                                <hr></hr>
                                <div>
                                    <table className="table table-bordered order-table table table-striped table-responsive-xl">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Mercaderia</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col"> Accion</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list.map(item => (

                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.mer.label}</td>
                                                    <td>{item.cant}</td>
                                                    <td> <button className='btn btn-danger'><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            {
                                this.state.edit ?
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarEditpedidos(event)} >Actualizar</button>
                                    :
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarpedidos(event)} >Guardar</button>
                            }
                        </div>

                    </Modal>
                </div>



                {/* <Modal visible={modalDelete} onClickBackdrop={handleCloseModal} className="">
                    <div className='container'>
                        <div className='modal-header'>
                            <h3>Eliminar Productos</h3>
                        </div>
                        <div className='modal-body'>
                            <h3>¿Desea eliminar este Productos?</h3>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            <button className='btn btn-danger' onClick={(event) => this.enviarDeletepedidos(event)}>Eliminar</button>
                        </div>
                    </div>
                </Modal> */}

            </>
        );
    }

    renderList() {
        const { data, current_page, per_page, total, to, from } = this.state.pedidos;
        const { color } = this.state;


        // busca la funcion de busqueda
        const filter = data.filter(res => {
            const provedor = res.prov_descr.toLowerCase();
            const mercaderia = res.merca_descr.toLowerCase();
            const estado = res.ped_estado;


            const campo = mercaderia + ' ' + provedor;
            //console.log('lista');
            //console.log(this.state.productos.data)


            return (
                campo.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
            )
        });

        const editpedidos = (agen) => {
            //console.log(agen);
            this.setState({ modal: true })
            this.setState({ edit: true })
            this.setState({
                formCodigo: agen.agend_cod_1,

            })

        }


        const handleOpenModalDelete = (pedidos) => {
            this.setState({ modalDelete: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: pedidos.agend_cod_1,
            })

        }


        return (
            <>
                <div className=''>
                    <table className="table table-bordered order-table table table-striped table-responsive-xl  ">
                        <thead >
                            <tr >
                                <th>#</th>
                                <th >Proveedor</th>
                                <th>Mercaderia</th>
                                <th>Cantidad</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {filter.map((pedidos, index) => {

                                return <tr key={pedidos.cod_pedido}>
                                    <td>{pedidos.cod_pedido}</td>
                                    <td >{pedidos.prov_descr}</td>
                                    <td>{pedidos.mercaderia}</td>
                                    <td>{pedidos.cantidad}</td>
                                    <td ><span style={{ backgroundColor: pedidos.color, color: 'white' }}>{pedidos.ped_estado}</span></td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => editpedidos(pedidos, this.setState({ edit: true }))}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        <button className='btn btn-danger' onClick={() => handleOpenModalDelete(pedidos)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>

                                </tr>

                            })}
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-center'>
                        <ul className=''>
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={this.state.pedidos.current_page}
                                itemsCountPerPage={this.state.pedidos.per_page}
                                totalItemsCount={this.state.pedidos.total}
                                onChange={(pageNumber) => this.getdata(pageNumber)}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Pagina : </b>{this.state.pedidos.current_page} <b>de </b>  {this.state.pedidos.to} <b>Total de datos mostrado :</b> {this.state.pedidos.total} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }


}
export default Pedidos;