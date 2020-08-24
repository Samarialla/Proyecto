import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import { serialize, deserialize } from "react-serialize"

class Orden_Compras extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dias: '',
            ordenes_c: null,
            modal: false,
            formCodigo: '',
            validacion: '',
            edit: false,
            modalDelete: false,
            modalDeletedetalle: false,
            search: '',
            color: '',
            formProveedor: '',
            formMercaderia: '',
            formMercaderiaName: '',
            selectedOption: null,
            pedidos: '',
            formCantidad: '',
            list: [],
            lista: [],
            mercad: [],
            additem: '',
            productoagregado: [],
            formCodigoPedido: '',
            datos_proveedor: '',
            total: 0
        };

    }

    //carga  los datos al renderizar el componente
    async componentDidMount() {
        await this.getdata();
        await this.getdatapedidos();


    }

    componentDidUpdate(prevProps, prevState, nextState) {
        // se recibe por props para actualizar si el estado es diferenete al prevPropscon
        if (this.props.actualizar_orden != prevProps.actualizar_orden) {
            //this.props.actualizar_orden(false)
            this.getdata();
            //this.getdatapedidos();
        }
    }

    //obtenemos los datos de uri
    async getdata(pageNumber = 1) {
        const url = `/ordenes?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ ordenes_c: response.data })
            //console.log(response.data)

        }).catch(error => {
            alert("Error " + error)
        })
    }

    enviarordenes(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('cod_pedido', this.state.formCodigoPedido)
        formData.append('datos_pedidos', JSON.stringify([this.state.selectedOption]))

        if (this.state.formCodigoPedido != '') {
            axios.post('/ordenes/insert', formData).then(response => {
                if (response.data.success == true) {
                    this.setState({ modal: false });
                    this.getdata();


                }
            }).catch(error => {
                console.log("Error " + error);
            })
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }

    enviarUpdateOrden(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('orden_cod', this.state.formCodigo);
        formData.append('pedido_cod_pedido', this.state.pedidos)

        if (this.state.formCodigo != '' && this.state.pedidos != '') {
            axios.post('/ordenes/update', formData).then(response => {
                if (response.data.success == true) {
                    this.setState({ modalDelete: false })
                    this.getdata();

                }
            }).catch(error => {
                console.log("Error " + error);
            })
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }

    imprimirOrden(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('orden_cod', this.state.formCodigo);
        if (this.state.formCodigo != '') {
            window.open('/imprimir?orden_cod=' + this.state.formCodigo)
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }


    async getdatapedidos() {
        const url = '/pedidos_compras';
        Axios.get(url).then(response => {
            this.setState({ pedidos: response.data })

        }).catch(error => {
            alert("Error " + error)
        })
    }





    /// si no se le asgina el stare por defecto a una constante a realizar render el componente no encuentra el data de la api
    render() {
        const { ordenes_c } = this.state;
        const { modal } = this.state;
        const { modalDelete } = this.state;
        const { modalDeletedetalle } = this.state;
        const { proveedores } = this.state;
        const { selectedOption } = this.state;
        //const { pedidos } = this.state;
        const { codigo, producto, cantidad, list } = this.state;
        const { data, current_page, per_page, total, to, from } = this.state.pedidos;


        const handleChangeOption = selectedOption => {
            this.setState({ selectedOption });
            const formData = new FormData();
            formData.append('cod_pedido_pedido', selectedOption.value);
            axios.post('/pedidos/get_detalle', formData).then(response => {
                //console.log(response.data);
                var total = 0;
                response.data.map((item) => {
                    total = total + (item.precioc * item.cantidad);
                })
                this.setState({ total: total });
                // console.log(total);
                this.setState({
                    lista: response.data,
                    formCodigoPedido: selectedOption.value
                });
                //console.log(this.state.lista);
            }).catch(error => {
                alert("Error " + error);
            })
            axios.post('/pedidos_compras_proveedor', formData).then(response => {
                //this.setState({ formProveedor: response.data });
                //console.log(this.state.formProveedor);
                response.data.map((prov, index) => {
                    this.setState({ formProveedor: prov.prov_descr })
                })
            }).catch(error => {
                alert("Error " + error);
            })

        };


        // para realizar la busqueda
        const buscador = e => {
            this.setState({ search: e.target.value });
        };



        // abre el modal
        const handleOpenModal = (event) => {
            event.preventDefault();
            this.setState({ modal: true });
            this.getdatapedidos();

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
                    // formordenes_cEstado: '',
                    formCantidad: '',
                    selectedOption: null,
                    formMercaderia: '',
                    list: [],
                    total: '',
                    formProveedor: ''

                })
            this.getdata();
        }


        // const handleOpenModalDelete = (item) => {
        //     this.setState({ modalDelete: true })
        //     //Modal.setAppElement('body');
        //     this.setState({
        //         formCodigoDetalle: item.ped_det_cod,
        //         formCodigo: item.pedido_cod_pedido
        //     })
        // }

        return (

            <>
                <div className="container">
                    <div className='row'>
                        <h1>Ordenes de Compras</h1>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='m-1'>
                            <button className='btn btn-success' onClick={(event) => handleOpenModal(event)}>+ Nuevo Orden de Compras</button>
                        </div>
                        <div className='offset-md-5 col-lg -10'>
                            <input className="form-control col-lg -10" label="search" icon="search" type="text" onChange={buscador}
                                placeholder="Buscar ordenes_c de compras"></input>
                        </div>
                    </div>
                    {ordenes_c && this.renderList()}
                </div>
                <div className='modal_ordenes_c'>
                    <Modal visible={modal} onClickBackdrop={handleCloseModal} dialogClassName='modal-dialog modal-lg'>

                        <div className="modal-header ">
                            {this.state.edit ? <h1>Ver  ordenes De Compras</h1> : <h1>Nuevo Ordenes de Compras</h1>}
                        </div>
                        <div className="modal-body">
                            {/* {this.state.formCodigo} */}

                            <form className='container'>

                                <div className='form-group'>


                                    {
                                        this.state.edit ?
                                            <input type='text' className='form-control' value={this.state.datos_proveedor} disabled={true} ></input>
                                            :
                                            <div>
                                                <label>Buscar Pedidos de Compras *</label>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={handleChangeOption}
                                                    options={data}
                                                    isSearchable
                                                    placeholder='Busqueda de Pedidos'
                                                />
                                            </div>
                                    }

                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <div>
                                    <div className='form-group'>
                                        <label>Proveedor *</label>

                                        {/* <select name="prov_descr" className="form-control " value={this.state.formProveedor} onChange={handleChangeProveedor}>
                                            <option></option>
                                            {proveedores && this.cargarComboProveedor()}
                                        </select> */}
                                        <input type='text' className='form-control' value={this.state.formProveedor} disabled={true} ></input>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <hr></hr>
                                <div>
                                    <table className="table table-bordered order-table table table-striped table-responsive-xl">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Mercaderia</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.lista.map(item => (

                                                <tr key={item.ped_det_cod}>
                                                    <td>{item.ped_det_cod}</td>
                                                    <td>{item.merca_descr}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.precioc}</td>
                                                    <td>{item.precioc * item.cantidad}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className='ml-5 pl-5 total'> Total : {this.state.total}</p>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">

                            {
                                this.state.edit ?
                                    <div>
                                        {/* <button type="submit" className="btn btn-primary" onClick={handleCloseModal} >Actualizar</button> */}
                                        <button type="submit" className="btn btn-success" target="_blank" onClick={(event) => this.imprimirOrden(event)} >Imprimir</button>
                                    </div>
                                    :
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarordenes(event)} >Guardar</button>
                            }
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                        </div>

                    </Modal>
                </div>



                <Modal visible={modalDelete} onClickBackdrop={handleCloseModal} className="">
                    <div className='container'>
                        <div className='modal-header'>
                            <h3>Actualizar ordenes de Compras</h3>
                        </div>
                        <div className='modal-body'>
                            <h3>¿Desea actualizar este este?</h3>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            <button className='btn btn-danger' onClick={(event) => this.enviarUpdateOrden(event)}>Eliminar</button>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }

    renderList() {
        const { data, current_page, per_page, total, to, from } = this.state.ordenes_c;
        const { color } = this.state;
        const { selectedOption } = this.state;


        // busca la funcion de busqueda
        const filter = data.filter(res => {
            const provedor = res.prov_descr.toLowerCase();
            const mercaderia = res.mercaderia.toLowerCase();
            const estado = res.ped_estado;


            const campo = mercaderia + ' ' + provedor;
            //console.log('lista');
            //console.log(this.state.productos.data)


            return (
                campo.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
            )
        });

        const editordenes = (ordenes) => {
            //console.log(ordenes);
            const formData = new FormData()
            this.setState({
                //selectedOption: ordenes.datos_pedidos,
                modal: true,
                edit: true,
                formCodigo: ordenes.orden_cod,
                formProveedor: ordenes.prov_descr,
                datos_proveedor: ordenes.datos_proveedores,
                selectedOption: ordenes.datos_pedidos

            })

            formData.append('cod_pedido_pedido', ordenes.cod_pedido);
            axios.post('/pedidos/get_detalle', formData).then(response => {
                //console.log(response.data);
                var total = 0;
                response.data.map((item) => {
                    total = total + (item.precioc * item.cantidad);
                })
                this.setState({ total: total });
                // console.log(total);
                this.setState({
                    lista: response.data
                });
                //console.log(this.state.selectedOption);
            }).catch(error => {
                alert("Error " + error);
            })

            // this.state.lista.map((item) => {
            //     let totales = 0;
            //     totales = totales + (item.precioc * item.cantidad);
            //     this.setState({total:totales});
            //     //return true
            // })
            // console.log(this.state.total);

        }


        const handleOpenModalDelete = (ordenes) => {
            this.setState({ modalDelete: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: ordenes.orden_cod,
                pedidos: ordenes.cod_pedido
            })

        }


        return (
            <>
                <div className=''>
                    <table className="table table-bordered order-table table table-striped table-responsive-xl  ">
                        <thead >
                            <tr >
                                <th>#</th>
                                <th >Codigo Pedido</th>
                                <th>Proveedor</th>
                                <th>Mercaderia</th>
                                <th>Fecha de pedido</th>
                                <th>Fecha de Orden de Compra</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {filter.map((ordenes, index) => {

                                return <tr key={ordenes.orden_cod}>
                                    <td>{ordenes.orden_cod}</td>
                                    <td>{ordenes.cod_pedido}</td>
                                    <td >{ordenes.prov_descr}</td>
                                    <td>{ordenes.mercaderia}</td>
                                    <td>{ordenes.ped_fecha}</td>
                                    <td>{ordenes.fechaorden}</td>
                                    <td ><span style={{ backgroundColor: ordenes.color, color: 'white' }}>{ordenes.estado_orden}</span></td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => editordenes(ordenes, this.setState({ edit: true }))}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                        <button className='btn btn-danger' onClick={() => handleOpenModalDelete(ordenes)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
                                activePage={this.state.ordenes_c.current_page}
                                itemsCountPerPage={this.state.ordenes_c.per_page}
                                totalItemsCount={this.state.ordenes_c.total}
                                onChange={(pageNumber) => this.getdata(pageNumber)}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Pagina : </b>{this.state.ordenes_c.current_page} <b>de </b>  {this.state.ordenes_c.to} <b>Total de datos mostrado :</b> {this.state.ordenes_c.total} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }


}
export default Orden_Compras;