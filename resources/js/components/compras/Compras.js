import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import { serialize, deserialize } from "react-serialize"

class Compras extends Component {

    constructor(props) {
        super(props);
        this.state = {
            compras: '',
            ordenes: '',
            modal_compras: false,
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
            formCodigoOrden: '',
            datos_proveedor: '',
            total: 0,
            factura: ''
        };

    }

    //carga  los datos al renderizar el componente
    async componentDidMount() {
        await this.getdata();
        await this.getdatapedidos();


    }

    componentDidUpdate(prevProps, prevState, nextState) {
        // se recibe por props para actualizar si el estado es diferenete al prevProps
        if (this.props.actualizar_compras != prevProps.actualizar_compras) {
            this.getdata();
            //this.getdatapedidos();
        }
    }

    //obtenemos los datos de uri
    async getdata(pageNumber = 1) {
        const url = `/compras?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ compras: response.data })
            //console.log(response.data)

        }).catch(error => {
            alert("Error " + error)
        })
    }

    enviarcompras(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('orden_cod', this.state.formCodigoOrden)
        formData.append('factura', this.state.factura)
        if (this.state.selectedOption != '' && this.state.factura != '' && this.state.formProveedor) {
            axios.post('/compras/insert', formData).then(response => {
                if (response.data.success == true) {
                    this.setState({ modal_compras: false });
                    this.getdata();


                }
            }).catch(error => {
                console.log("Error " + error);
            })
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }

    enviarUpdateCompras(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('cod_com', this.state.formCodigo);
        formData.append('orden_cod', this.state.formCodigoOrden)

        if (this.state.formCodigo != '' && this.state.formCodigoOrden != '') {
            axios.post('/compras/update', formData).then(response => {
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

    imprimirCompras(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('cod_com', this.state.formCodigo);
        if (this.state.formCodigo != '') {
            window.open('/imprimirCompras?cod_com=' + this.state.formCodigo)
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }


    async getdatapedidos() {
        const url = '/pedidos_orden';
        Axios.get(url).then(response => {
            this.setState({ ordenes: response.data })
            //console.log(this.state.ordenes.data);
        }).catch(error => {
            alert("Error " + error)
        })
    }





    /// si no se le asgina el stare por defecto a una constante a realizar render el componente no encuentra el data de la api
    render() {
        const { compras } = this.state;
        const { modal_compras } = this.state;
        const { modalDelete } = this.state;
        const { proveedores } = this.state;
        const { selectedOption } = this.state;
        //const { ordenes } = this.state;
        const { codigo, producto, cantidad, list } = this.state;
        const { data, current_page, per_page, total, to, from } = this.state.ordenes;
        ///console.log(this.state.ordenes);

        const handleChangeOption = selectedOption => {
            this.setState({ selectedOption });
            const formData = new FormData();
            formData.append('orden_cod', selectedOption.value);
            formData.append('accion', 'compras');
            axios.post('/compras/lista_detalle_orden', formData).then(response => {
                //console.log(response.data);
                var total = 0;
                response.data.map((item) => {
                    total = total + (item.precioc * item.cantidad);
                })
                this.setState({ total: total });
                // console.log(total);
                this.setState({
                    lista: response.data,
                    formCodigoOrden: selectedOption.value
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

        const handleChangeFactura = (event) => {
            this.setState({ factura: event.target.value });
        }


        // para realizar la busqueda
        const buscador = e => {
            this.setState({ search: e.target.value });
        };



        // abre el modal
        const handleOpenModal = (event) => {
            event.preventDefault();
            this.setState({ modal_compras: true });
            //console.log(this.state.modal_compras)
            this.getdatapedidos();

        }

        //cierra el modal
        const handleCloseModal = event => {
            event.preventDefault();
            // se limpia para state para evitar error al cerrar o abrir el modal
            this.setState(
                {
                    modal_compras: false,
                    formCodigo: '',
                    validacion: '',
                    edit: false,
                    modalDelete: false,
                    factura: '',
                    formCantidad: '',
                    selectedOption: null,
                    formMercaderia: '',
                    list: [],
                    lista: [],
                    total: '',
                    formProveedor: ''

                })
            this.getdata();
        }


      
        return (

            <>
                <div className="container">
                    <div className='row'>
                        <h1>Compras</h1>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='m-1'>
                            <button className='btn btn-success' onClick={(event) => handleOpenModal(event)}>+ Nuevo Compras</button>
                        </div>
                        <div className='offset-md-5 col-lg -10'>
                            <input className="form-control col-lg -10" label="search" icon="search" type="text" onChange={buscador}
                                placeholder="Buscar  compras"></input>
                        </div>
                    </div>
                    {compras && this.renderList()}
                </div>
                <div className='modal_pedidos'>
                    <Modal visible={modal_compras} onClickBackdrop={handleCloseModal} dialogClassName='modal-dialog modal-lg'>
                        <div className="modal-header ">
                            {this.state.edit ? <h1>Ver  Compras</h1> : <h1>Nuevo  Compras</h1>}
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
                                                    placeholder='Busqueda de Orden De Compras'
                                                />
                                            </div>
                                    }
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <div>
                                    <div className='form-group'>
                                        <label>Proveedor *</label>
                                        <input type='text' className='form-control' value={this.state.formProveedor} disabled={true} ></input>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <div>
                                    <label>Factura Numero *</label>
                                </div>
                                <div >
                                    <div>
                                        <input type='text' className='form-control' value={this.state.factura} onChange={handleChangeFactura} disabled={this.state.edit == true ? true : false} required></input>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <hr></hr>
                                <div>
                                    <table className="table table-bordered order-table table table-striped table-responsive-xl">
                                        <thead>
                                            <tr>
                                                <th scope="col">Codigo Orden</th>
                                                <th scope="col">Codigo Pedido</th>
                                                <th scope="col">Mercaderia</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.lista.map(item => (
                                                <tr key={item.ped_det_cod}>
                                                    <td>{item.orden_cod}</td>
                                                    <td>{item.cod_pedido}</td>
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
                                        <button type="submit" className="btn btn-success" target="_blank" onClick={(event) => this.imprimirCompras(event)} >Imprimir</button>
                                    </div>
                                    :
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarcompras(event)} >Guardar</button>
                            }
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                        </div>

                    </Modal>
                </div>




                <Modal visible={modalDelete} onClickBackdrop={handleCloseModal} className="">
                    <div className='container'>
                        <div className='modal-header'>
                            <h3>Actualizar Compras</h3>
                        </div>
                        <div className='modal-body'>
                            <h3>¿Desea actualizar este este?</h3>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            <button className='btn btn-danger' onClick={(event) => this.enviarUpdateCompras(event)}>Eliminar</button>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }

    renderList() {
        const { data, current_page, per_page, total, to, from } = this.state.compras;
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

        const editorCompras = (compras) => {
            //console.log(ordenes);
            const formData = new FormData()
            console.log(compras)
            this.setState({
                //selectedOption: compras.datos_pedidos,
                modal_compras: true,
                edit: true,
                formCodigo: compras.cod_com,
                formProveedor: compras.prov_descr,
                datos_proveedor: compras.datos_proveedores,
                factura: compras.num_fact_com

            })
            formData.append('orden_cod', compras.orden_cod);
            formData.append('accion', 'compras');
            axios.post('/compras/lista_detalle_orden', formData).then(response => {
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



        }


        const handleOpenModalDelete = (compras) => {
            this.setState({ modalDelete: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: compras.cod_com,
                formCodigoOrden: compras.orden_cod
            })

        }


        return (
            <>
                <div className=''>
                    <table className="table table-bordered order-table table table-striped table-responsive-xl  ">
                        <thead >
                            <tr >
                                <th>#</th>
                                <th >Codigo Orden</th>
                                <th>Codigo de Pedido</th>
                                <th>Proveedor</th>
                                <th>Fecha de pedido</th>
                                <th>Fecha de Orden de Compra</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {filter.map((compras, index) => {

                                return <tr key={index}>
                                    <td>{compras.cod_com}</td>
                                    <td>{compras.orden_cod}</td>
                                    <td>{compras.cod_pedido}</td>
                                    <td >{compras.prov_descr}</td>
                                    <td>{compras.ped_fecha}</td>
                                    <td>{compras.fechaorden}</td>
                                    <td ><span style={{ backgroundColor: compras.color, color: 'white' }}>{compras.estado_com}</span></td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => editorCompras(compras, this.setState({ edit: true }))}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                        <button className='btn btn-danger' onClick={() => handleOpenModalDelete(compras)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
                                activePage={this.state.compras.current_page}
                                itemsCountPerPage={this.state.compras.per_page}
                                totalItemsCount={this.state.compras.total}
                                onChange={(pageNumber) => this.getdata(pageNumber)}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Pagina : </b>{this.state.compras.current_page} <b>de </b>  {this.state.compras.to} <b>Total de datos mostrado :</b> {this.state.compras.total} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }


}
export default Compras;