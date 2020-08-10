import React, { Component } from 'react';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';

class AgendaMedica extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dias: '',
            agenda: null,
            modal: false,
            formCodigo: '',
            formCupo: '',
            formHoraFinal: '',
            forHoraInicio: '',
            formaAgendaObser: '',
            formaAgendaHoraInicio: '',
            formAgendaEstado: '',
            formAgendaMedico: '',
            formAgendaDias: [],
            formEspec: '',
            validacion: '',
            edit: false,
            modalDelete: false,
            search: '',
            proveedores: '',
            medicos: '',
            especialidad: '',
            dias: '',
            diasDoctor: '',
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: '',
            domingo: '',
            selectedOption: null,

        };

    }

    enviarAgenda(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('cupo', this.state.formCupo)
        formData.append('agen_hora_final', this.state.formHoraFinal)
        formData.append('agenda_observ', this.state.formaAgendaObser)
        formData.append('agenda_hora_inicio', this.state.formaAgendaHoraInicio)
        formData.append('agent_medi_estado', this.state.formAgendaEstado)
        formData.append('datos',JSON.stringify(this.state.selectedOption))
        formData.append('medico_medico_cod_1', this.state.formAgendaMedico)
        formData.append('especialidades_espec_cod_1', this.state.formEspec)

        if (this.state.formaAgendaHoraInicio != '' && this.state.formCupo != '' && this.state.formHoraFinal != '' && this.state.formaAgendaObser != '') {
            axios.post('/agenda/insert', formData).then(response => {
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
    //edicion de agenda
    enviarEditAgenda(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('agend_cod_1', this.state.formCodigo)
        formData.append('cupo', this.state.formCupo)
        formData.append('agen_hora_final', this.state.formHoraFinal)
        formData.append('agenda_observ', this.state.formaAgendaObser)
        formData.append('agenda_hora_inicio', this.state.formaAgendaHoraInicio)
        formData.append('agent_medi_estado', this.state.formAgendaEstado)
        formData.append('datos', JSON.stringify(this.state.selectedOption))
        formData.append('medico_medico_cod_1', this.state.formAgendaMedico)
        formData.append('especialidades_espec_cod_1', this.state.formEspec)
        if (this.state.formaAgendaHoraInicio != '' && this.state.formCupo != '' && this.state.formHoraFinal != ''  && this.state.selectedOption != '') {
            axios.post('/agenda/update', formData).then(response => {
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
    enviarDeleteAgenda(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('agend_cod_1', this.state.formCodigo)

        if (this.state.formCodigo != '') {
            axios.post('/agenda/delete', formData).then(response => {
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
        await this.getdataMedico();
        await this.getdataEspecialidad();
        await this.getdataDias();
        //await this.cargarRadioDias();
    }
    //obtenemos los datos de uri
    async getdata(pageNumber = 1) {
        const url = `/agenda?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ agenda: response.data })
            //console.log(response.data)

        }).catch(error => {
            alert("Error " + error)
        })
    }
    //obtenemos el medic
    async getdataMedico() {
        const url = '/medicos';
        Axios.get(url).then(response => {
            this.setState({ medicos: response.data })
        }).catch(error => {
            alert("Error " + error)
        })
    }
    async getdataEspecialidad() {
        const url = '/especialidades';
        Axios.get(url).then(response => {
            this.setState({ especialidad: response.data })

        }).catch(error => {
            alert("Error " + error)
        })
    }
    async getdataDias() {
        const url = '/dias';
        Axios.get(url).then(response => {
            this.setState({ dias: response.data })
            //console.log(this.state.dias);
        }).catch(error => {
            alert("Error " + error)
        })
    }
    cargarComboMedico() {
        const { data, current_page, per_page, total, to, from } = this.state.medicos;
        return (
            <>
                {data.map((medic, index) => {
                    return (<option key={index} value={medic.medico_cod_1}>{medic.medic_nombre} {medic.medic_apellido}</option>)
                })}
            </>
        )
    }
    cargarComboEspecialidad() {
        const { data, current_page, per_page, total, to, from } = this.state.especialidad;
        return (
            <>
                {data.map((espec, index) => {
                    return (<option key={index} value={espec.espec_cod_1}>{espec.espec_descrip}</option>)
                })}
            </>
        )
    }

    cargarDias() {
        const { data, current_page, per_page, total, to, from } = this.state.dias;
        const options= data;
      
    }
    /// si no se le asgina el stare por defecto a una constante a realizar render el componente no encuentra el data de la api
    render() {
        const { agenda } = this.state;
        const { modal } = this.state;
        const { modalDelete } = this.state;
        const { medicos } = this.state;
        const { dias } = this.state;
        const { especialidad } = this.state;
        const { selectedOption } = this.state;
        const { data, current_page, per_page, total, to, from } = this.state.dias;
      const  handleChangeOption = selectedOption => {
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
                    formCupo: '',
                    formHoraFinal: '',
                    formaAgendaObser: '',
                    formaAgendaHoraInicio: '',
                    validacion: '',
                    edit: false,
                    modalDelete: false,
                    lunes: '',
                    martes: '',
                    miercoles: '',
                    jueves: '',
                    viernes: '',
                    sabado: '',
                    domingo: '',
                    formAgendaEstado: '',
                    formAgendaMedico: '',
                    formEspec: ''
                })
        }
        // escucha a los values
        const handleChangeMedico = (event) => {
            this.setState({ formAgendaMedico: event.target.value });
        }
        const handleChangeEspec = (event) => {
            this.setState({ formEspec: event.target.value });
        }
        const handleChangeHoraInicio = (event) => {
            this.setState({ formaAgendaHoraInicio: event.target.value });
        }
        const handleChangeHoraFin = (event) => {
            this.setState({ formHoraFinal: event.target.value });
        }
        const handleChangeEstado = (event) => {
            this.setState({ formAgendaEstado: event.target.value });
        }

        const handleChangeObserv = (event) => {
            this.setState({ formaAgendaObser: event.target.value });
        }
        const handleChangeCupo = (event) => {
            this.setState({ formCupo: event.target.value })
        }
      


        return (

            <>
                <div className="container">
                    <div className='row'>
                        <h1>Agenda Medica</h1>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='m-1'>
                            <button className='btn btn-success' onClick={(event) => handleOpenModal(event)}>+ Nuevo Producto</button>
                        </div>
                        <div className='offset-md-5 col-lg -10'>
                            <input className="form-control col-lg -10" label="search" icon="search" type="text" onChange={buscador}
                                placeholder="Buscar Agenda Medica"></input>
                        </div>
                    </div>
                    {agenda && this.renderList()}
                </div>
                <div className='modal_agenda'>
                    <Modal visible={modal} onClickBackdrop={handleCloseModal} dialogClassName='modal-dialog'>

                        <div className="modal-header ">
                            {this.state.edit ? <h1>Editar Agenda</h1> : <h1>Nuevo Agenda</h1>}
                        </div>
                        <div className="modal-body">
                            <form className='container'>
                                <div>
                                    <label>Medicos *</label>
                                </div>
                                <div  >
                                    <select name="medico_cod_1" className="form-control " value={this.state.formAgendaMedico} onChange={handleChangeMedico}>
                                        <option></option>
                                        {medicos && this.cargarComboMedico()}
                                    </select>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>

                                <div className='form-group'>
                                    <div>
                                        <label>Especialidad *</label>
                                    </div>
                                    <div>
                                        <select name="espec_cod_1" className="form-control " value={this.state.formEspec} onChange={handleChangeEspec}>
                                            <option></option>
                                            {especialidad && this.cargarComboEspecialidad()}
                                        </select>
                                        <span className='validacion'>{this.state.validacion}</span>
                                    </div>
                                </div>

                                <div>
                                    <label>Cupo *</label>
                                </div>
                                <div  >
                                    <input type='number' className="form-control" min='1' value={this.state.formCupo} onChange={handleChangeCupo}></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                                <div className='form-group'>
                                    <div>
                                        <label>Dias *</label>
                                    </div>
                                    <div className='form-group' >
                                        <Select
                                            value={selectedOption}
                                            onChange={handleChangeOption}
                                            options={data}
                                            isMulti
                                            isSearchable
                                            placeholder='Ingrese los dias'
                                        />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div>
                                        <label>Horas de Inicio de la Consulta *</label>
                                    </div>
                                    <div className='m-3' >
                                        <input name='hora_inicio' value={this.state.formaAgendaHoraInicio} onChange={handleChangeHoraInicio} type='time'></input>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>

                                </div>
                                <div className='form-group'>
                                    <div >
                                        <label>Horas Fin de la Consulta *</label>
                                    </div>
                                    <div className='m-3'>
                                        <input name='hora_fin' value={this.state.formHoraFinal} onChange={handleChangeHoraFin} type='time'></input>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>

                                </div>
                                <div className='form-group'>
                                    <div >
                                        <label>Observacion *</label>
                                    </div>
                                    <div className='m-2'>

                                        <textarea className="form-control" value={this.state.formaAgendaObser} maxLength='100' onChange={handleChangeObserv} rows="2%" id="comment"></textarea>
                                    </div>
                                    <span className='validacion'>{this.state.validacion}</span>

                                </div>
                                <div className='form-group'>
                                    <div>
                                        <label>Estado *</label>
                                    </div>
                                    <div>
                                        <select name="agenda_estado" className="form-control " value={this.state.formAgendaEstado} onChange={handleChangeEstado}>
                                            <option></option>
                                            <option value='Activo'>Activo</option>
                                            <option value='Anulado'>Anulado</option>
                                        </select>
                                        <span className='validacion'>{this.state.validacion}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                            {
                                this.state.edit ?
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarEditAgenda(event)} >Actualizar</button>
                                    :
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.enviarAgenda(event)} >Guardar</button>
                            }
                        </div>

                    </Modal>
                </div>



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
                            <button className='btn btn-danger' onClick={(event) => this.enviarDeleteAgenda(event)}>Eliminar</button>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }

    renderList() {
        const { data, current_page, per_page, total, to, from } = this.state.agenda;

        // busca la funcion de busqueda
        const filter = data.filter(res => {
            const medico = res.medicos.toLowerCase();
            const especialidad = res.medicos.toLowerCase();

            const campo = medico + ' ' + especialidad;
            //console.log('lista');
            //console.log(this.state.productos.data)
            return (

                campo.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1

            )
        });

        const editAgenda = (agen) => {
            //console.log(agen);
            this.setState({ modal: true })
            this.setState({ edit: true })
            this.setState({
                formCodigo: agen.agend_cod_1,
                formCupo: agen.cupo,
                formHoraFinal: agen.final_agenda,
                forHoraInicio: agen.agenda_hora_inicio,
                formaAgendaObser: agen.agenda_observ,
                formaAgendaHoraInicio: agen.agenda_hora_inicio,
                formAgendaEstado: agen.agent_medi_estado,
                formAgendaMedico: agen.medico_cod_1,
                formAgendaDias: [],
                formEspec: agen.espec_cod_1,
                selectedOption :agen.datos
            })

        }


        const handleOpenModalDelete = (agenda) => {
            this.setState({ modalDelete: true })
            //Modal.setAppElement('body');
            this.setState({
                formCodigo: agenda.agend_cod_1,
            })

        }


        return (
            <>
                <div className=''>
                    <table className="table table-bordered order-table table table-striped table-responsive-xl  ">
                        <thead >
                            <tr >
                                <th>#</th>
                                <th >Medicos</th>
                                <th>Especialidad</th>
                                <th>Dias</th>
                                <th>Fecha de Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Cupo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {filter.map((agenda, index) => {

                                return <tr key={agenda.agend_cod_1}>
                                    <td>{agenda.agend_cod_1}</td>
                                    <td >{agenda.medicos}</td>
                                    <td>{agenda.espec_descrip}</td>
                                    <td>{agenda.diasDoctor}</td>
                                    <td>{agenda.agenda_hora_inicio}</td>
                                    <td>{agenda.final_agenda}</td>
                                    <td>{agenda.cupo}</td>
                                    {
                                        agenda.agent_medi_estado == 'Anulado' ?
                                            <td style={{ color: "red" }}>{agenda.agent_medi_estado}</td>
                                            :
                                            <td style={{ color: "blue" }}>{agenda.agent_medi_estado}</td>
                                    }

                                    <td>
                                        <button className='btn btn-info' onClick={() => editAgenda(agenda, this.setState({ edit: true }))}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        <button className='btn btn-danger' onClick={() => handleOpenModalDelete(agenda)}><i className="fa fa-trash" aria-hidden="true"></i></button>
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
                                activePage={this.state.agenda.current_page}
                                itemsCountPerPage={this.state.agenda.per_page}
                                totalItemsCount={this.state.agenda.total}
                                onChange={(pageNumber) => this.getdata(pageNumber)}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Pagina : </b>{this.state.agenda.current_page} <b>de </b>  {this.state.agenda.to} <b>Total de datos mostrado :</b> {this.state.agenda.total} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default AgendaMedica;