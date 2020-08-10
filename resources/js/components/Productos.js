import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: null,
            modal: false,
            formCodigo: '',
            formDesc: '',
            formPrecV: '',
            formPrecC: '',
            formProveedor: '',
            validacion: '',
            edit: false,
            modalDelete: false,
            search: '',
            proveedores: ''

        };

    }

    enviarProductos(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('merca_descr', this.state.formDesc)
        formData.append('merc_preciov', this.state.formPrecV)
        formData.append('precioc', this.state.formPrecC)
        formData.append('cod_prov', this.state.formProveedor)
        if (this.state.formProveedor != '' && this.state.formDesc != '' && this.state.formPrecV != '' && this.state.formPrecC != '') {
            axios.post('/productos/insert', formData).then(response => {
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
    //edicion de clientes
    enviarEditProveedor(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('mercaderia_cod', this.state.formCodigo)
        formData.append('merca_descr', this.state.formDesc)
        formData.append('merc_preciov', this.state.formPrecV)
        formData.append('precioc', this.state.formPrecC)
        formData.append('cod_prov', this.state.formProveedor)
        if (this.state.formProveedor != '' && this.state.formDesc != '' && this.state.formPrecV != '' && this.state.formPrecC != '') {
            axios.post('/productos/update', formData).then(response => {
                if (response.data.success == true) {
                    this.setState({ modal: false })
                    this.getdata();
                }
            }).catch(error => {
                console.log("Error " + error);
            })
        } else {
            this.setState({ validacion: 'Campo obligatorio' })
        }
    }
    enviarDeleteProductos(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('mercaderia_cod', this.state.formCodigo)

        if (this.state.formCodigo != '') {
            axios.post('/productos/delete', formData).then(response => {
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


    //carga  los datos al renderizar el componente
    async componentDidMount() {
        await this.getdata();
        await this.getdataProveedor();
        //console.log(this.cargarCombo())
        //console.log(data)
    }

    //obtenemos los datos de uri
    async getdata(pageNumber = 1) {
        const url = `/productos?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ productos: response.data })
            // console.log(this.state.clientes);
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


    cargarCombo() {
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
        const { productos } = this.state;
        const { modal } = this.state;
        const { modalDelete } = this.state;
        const { proveedores } = this.state;


        // para realizar la busqueda
        const onchange = e => {
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
                    formDesc: '',
                    formPrecV: '',
                    formPrecC: '',
                    formProveedor: '',
                    validacion: '',
                    edit: false,
                    modalDelete: false
                })
        }

        // escucha a los values
        const handleChangeDescripcion = (event) => {
            this.setState({ formDesc: event.target.value });
        }


        const handleChangePrecioV = (event) => {
            this.setState({ formPrecV: event.target.value });
        }
        const handleChangePrecioC = (event) => {
            this.setState({ formPrecC: event.target.value });
        }

        const handleChangeProveedor = (event) => {
            this.setState({ formProveedor: event.target.value });
        }

        /******fin de crear*********/




        return (

            <>
                <div className="container">
                    <div className='row'>
                        <h1>Productos</h1>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='m-1'>
                            <button className='btn btn-success' onClick={(event) => handleOpenModal(event)}>+ Nuevo Producto</button>
                        </div>
                        <div className='offset-md-5 col-lg -10'>
                            <input className="form-control col-lg -10" label="search" icon="search" type="text" onChange={onchange}
                                placeholder="Buscar Productos"></input>
                        </div>
                    </div>
                    {productos && this.renderList()}
                </div>

                <Modal visible={modal} onClickBackdrop={handleCloseModal}>
                    <div className="modal-header">
                        {this.state.edit ? <h1>Editar Productos</h1> : <h1>Nuevo Productos</h1>}
                    </div>
                    <div className="modal-body">
                        <form className='container'>
                            <div>
                                <label>Descripcion *</label>
                            </div>
                            <div  >
                                <input type='text' className='form-control' value={this.state.formDesc} onChange={handleChangeDescripcion} ></input>
                                <span className='validacion'>{this.state.validacion}</span>
                            </div>

                            <div className='form-group'>
                                <div>
                                    <label>Precio Venta *</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.formPrecV} onChange={handleChangePrecioV} required></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <label>Precio Compra *</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.formPrecC} onChange={handleChangePrecioC} required ></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Proveedor *</label> {this.state.formProveedor}
                               
                                <select  name="prov_descr" className="form-control " value={this.state.formProveedor} onChange={handleChangeProveedor}>
                                {proveedores && this.cargarCombo()}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                        {
                            this.state.edit ?
                                <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarEditProveedor(event)} >Actualizar</button>
                                :
                                <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarProductos(event)} >Guardar</button>
                        }
                    </div>
                </Modal>



                <Modal visible={modalDelete} onClickBackdrop={handleCloseModal} className="">
                    <div className='container'>
                        <div className='modal-header'>
                            <h3>Eliminar Productos</h3>
                        </div>
                        <div className='modal-body'>
                            <h3>¿Desea eliminar este Productos?</h3>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            <button className='btn btn-danger' onClick={(event) => this.enviarDeleteProductos(event)}>Eliminar</button>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }

    renderList() {
        const { data, current_page, per_page, total, to, from } = this.state.productos;

        //busca la funcion de busqueda
        const filter = data.filter(res => {
            const mercadera = res.merca_descr.toLowerCase();

            const campo = mercadera;
            //console.log('lista');
            //console.log(this.state.productos.data)
            return (

                campo.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1

            )
        });

        const editProducto = (producto) => {
            this.setState({ modal: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: producto.mercaderia_cod,
                formDesc: producto.merca_descr,
                formPrecV: producto.merc_preciov,
                formPrecC: producto.precioc,
                formProveedor: producto.cod_prov
            })

        }


        const handleOpenModalDelete = (producto) => {
            this.setState({ modalDelete: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: producto.mercaderia_cod,
            })

        }

        return (
            <>
                <div className='container'>
                    <table className="table table-bordered order-table ">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Descripcion</th>
                                <th>Precio Venta</th>
                                <th>Precio Compra</th>
                                <th>Proveedor</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {filter.map((producto, index) => {

                                return <tr key={producto.mercaderia_cod}>
                                    <td>{producto.mercaderia_cod}</td>
                                    <td >{producto.merca_descr}</td>
                                    <td>{producto.merc_preciov}</td>
                                    <td>{producto.precioc}</td>
                                    <td>{producto.prov_descr}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => editProducto(producto, this.setState({ edit: true }))}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        <button className='btn btn-danger' onClick={() => handleOpenModalDelete(producto)}><i className="fa fa-trash" aria-hidden="true"></i></button>
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
                                activePage={this.state.productos.current_page}
                                itemsCountPerPage={this.state.productos.per_page}
                                totalItemsCount={this.state.productos.total}
                                onChange={(pageNumber) => this.getdata(pageNumber)}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Pagina : </b>{this.state.productos.current_page} <b>de </b>  {this.state.productos.to} <b>Total de datos mostrado :</b> {this.state.productos.total} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default Productos;