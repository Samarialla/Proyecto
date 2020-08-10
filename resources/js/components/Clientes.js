import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
class Clientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientes: null,
            modal: false,
            formCodigo: '',
            formNombre: '',
            formApellido: '',
            formTelefono: '',
            formCedula: '',
            formDireccion: '',
            validacion: '',
            edit: false,
            modalDelete: false,
            search: ''

        };

    }

    enviarClientes(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('fun_nombre', this.state.formNombre)
        formData.append('fun_apellido', this.state.formApellido)
        formData.append('func_telef', this.state.formTelefono)
        formData.append('fun_cedula', this.state.formCedula)
        formData.append('fun_direccion', this.state.formDireccion)
        if (this.state.formNombre != '' && this.state.formApellido != '' && this.state.formTelefono != '' && this.state.formCedula != '') {
            axios.post('/funcionario/insert', formData).then(response => {
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
    enviarEditClientes(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('fun_cod_1', this.state.formCodigo)
        formData.append('fun_nombre', this.state.formNombre)
        formData.append('fun_apellido', this.state.formApellido)
        formData.append('func_telef', this.state.formTelefono)
        formData.append('fun_cedula', this.state.formCedula)
        formData.append('fun_direccion', (this.state.formDireccion =='null')? '':this.state.formDireccion)
        if (this.state.formNombre != '' && this.state.formApellido != '' && this.state.formTelefono != '' && this.state.formCedula != '') {
            axios.post('/funcionario/update', formData).then(response => {
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
    enviarDeleteClientes(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('fun_cod_1', this.state.formCodigo)

        if (this.state.formCodigo != '') {
            axios.post('/funcionario/delete', formData).then(response => {
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


    //carga  los al renderizar el componente
    async componentDidMount() {
        await this.getdata();
    }

    //obtenemos los datos de uri
    async getdata(pageNumber = 1) {
        const url = `/funcionario?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ clientes: response.data })
          
        }).catch(error => {
            alert("Error " + error)
        })
    }



    render() {
        const { clientes } = this.state;
        const { modal } = this.state;
        const { modalDelete } = this.state;

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
                    formNombre: '',
                    formApellido: '',
                    formTelefono: '',
                    formCedula: '',
                    formDireccion: '',
                    validacion: '',
                    edit: false,
                    modalDelete: false
                })
        }

        // escucha a los values
        const handleChangeNombre = (event) => {
            this.setState({ formNombre: event.target.value });
        }

        const handleChangeApellido = (event) => {
            this.setState({ formApellido: event.target.value });
        }

        const handleChangeTelefono = (event) => {
            this.setState({ formTelefono: event.target.value });
        }
        const handleChangeCedula = (event) => {
            this.setState({ formCedula: event.target.value });
        }

        const handleChangeDireccion = (event) => {
            this.setState({ formDireccion: event.target.value });
        }

        /******fin de crear*********/



        return (
            <>
                <div className="container">
                    <div className='row'>
                        <h1>Clientes</h1>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='m-1'>
                            <button className='btn btn-success' onClick={(event) => handleOpenModal(event)}>+ Nuevo Cliente</button>
                        </div>
                        <div className='offset-md-5 col-lg -10'>
                            <input className="form-control col-lg -10" label="search" icon="search" type="text" onChange={onchange}
                                placeholder="Buscar Clientes"></input>
                        </div>
                    </div>
                    {clientes && this.renderList()}
                </div>
                <Modal></Modal>
                <Modal visible={modal} onClickBackdrop={handleCloseModal}>
                    <div className="modal-header">
                    {this.state.edit ? <h1>Editar Clientes</h1> : <h1>Nuevo Clientes</h1>}
                    </div>
                    <div className="modal-body">
                    <form className='container'>
                            <div>
                                <label>Nombre *</label>
                            </div>
                            <div  >
                                <input type='text' className='form-control' value={this.state.formNombre} onChange={handleChangeNombre} ></input>
                                <span className='validacion'>{this.state.validacion}</span>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <label>Apellido *</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.formApellido} onChange={handleChangeApellido} required></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <label>Telefono *</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.formTelefono} onChange={handleChangeTelefono} required></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <label>Cedula *</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.formCedula} onChange={handleChangeCedula} required ></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <label>Direccion</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.formDireccion ==null? '':this.state.formDireccion} onChange={handleChangeDireccion}  ></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                                {
                                    this.state.edit ?
                                        <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarEditClientes(event)} >Actualizar</button>
                                        :
                                        <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarClientes(event)} >Guardar</button>
                                }
                    </div>
                </Modal>

              

                <Modal visible={modalDelete} onClickBackdrop={handleCloseModal} className="">
                    <div className='container'>
                        <div className='modal-header'>
                            <h3>Eliminar Clientes</h3>
                        </div>
                        <div className='modal-body'>
                        <h3>¿Desea eliminar este Cliente?</h3>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            <button className='btn btn-danger' onClick={(event) => this.enviarDeleteClientes(event)}>Eliminar</button>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }

    renderList() {
        const { data, current_page, per_page, total, to, from } = this.state.clientes;
       
       //busca la funcion de busqueda
        const filter = data.filter(res => {
            const nombre = res.fun_nombre.toLowerCase();
            const cedula = res.fun_cedula.toLowerCase();
            const apellido = res.fun_apellido.toLowerCase();
            const campo = nombre + ' ' + cedula +' '+ apellido;
            return (

                campo.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1

            )
        });

        const editClientes = (cliente) => {
            this.setState({ modal: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: cliente.fun_cod_1,
                formNombre: cliente.fun_nombre,
                formApellido: cliente.fun_apellido,
                formTelefono: cliente.func_telef,
                formCedula: cliente.fun_cedula,
                formDireccion: cliente.fun_direccion
            })

        }


        const handleOpenModalDelete = (cliente) => {
            this.setState({ modalDelete: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: cliente.fun_cod_1,
            })

        }

        return (
            <>
                <div className='container'>
                    <table className="table table-bordered order-table ">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>Cedula</th>
                                <th>Direccion</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {filter.map((cliente, index) => {

                                return <tr key={cliente.fun_cod_1}>
                                    <td >{cliente.fun_cod_1}</td>
                                    <td>{cliente.fun_nombre}</td>
                                    <td>{cliente.fun_apellido}</td>
                                    <td>{cliente.func_telef}</td>
                                    <td>{cliente.fun_cedula}</td>
                                    <td>{cliente.fun_direccion}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => editClientes(cliente, this.setState({ edit: true }))}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        <button className='btn btn-danger' onClick={() => handleOpenModalDelete(cliente)}><i className="fa fa-trash" aria-hidden="true"></i></button>
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
                                activePage={this.state.clientes.current_page}
                                itemsCountPerPage={this.state.clientes.per_page}
                                totalItemsCount={this.state.clientes.total}
                                onChange={(pageNumber) => this.getdata(pageNumber)}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Pagina : </b>{this.state.clientes.current_page} <b>de </b>  {this.state.clientes.to} <b>Total de datos mostrado :</b> {this.state.clientes.total} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default Clientes;