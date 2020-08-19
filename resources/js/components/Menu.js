import React, { Component } from "react";
import ReactDOM, { render } from 'react-dom';
import Clientes from "./Clientes";
import Index from "./Index";
import ListGroup from 'react-bootstrap/ListGroup'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Bienvenido from "./Bienvenido";
import AgendaMedica from "./agendaMedica/AgendaMedica";
import Axios from 'axios';
import Pedidos from "./compras/Pedidos";
import Productos from "./Productos";
import Orden_Compras from "./compras/Orden_Compras";

/*
notas se pueder realizar que el nav bar y el secundarios esten esten el mismo compente asi para evitar el problema de child 
asi manejar con estados  el render dentro del componente 

ejemplo : https://stackoverflow.com/questions/44822341/render-react-component-onclick

este hace referencia a como realizar valor

*/
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modulos: '',
            estado: false

        }
        // console.log(window.location);
    }


    //carga  los datos al renderizar el componente
    async componentDidMount() {
        await this.getModulo();



        //await this.cargarRadioDias();
    }


    //obtenemos los datos de uri
    async getModulo() {
        const url = '/modulos';
        Axios.get(url).then(response => {
            this.setState({ modulos: response.data })
            //console.log(this.state.modulos)

        }).catch(error => {
            alert("Error " + error)
        })
    }
    //obtenemos el medico

    async getdataPedidos(pageNumber = 1) {
        const url = `/pedidos?page=${pageNumber}`;
        Axios.get(url).then(response => {
            this.setState({ pedidos: response.data })
            //console.log(response.data)

        }).catch(error => {
            alert("Error " + error)
        })
    }

    render() {
        const { modulos } = this.state;

        const handleSelect = (eventKey) => {
            console.log(`${eventKey}`);

            switch (`${eventKey}`) {
                case '#Pedidos':
                    this.setState({ estado: true })
                    break;
                case '#Orden_Compras':
                    this.setState({ estado: false })
                    break;
                default:
                    break;
            }
        }

        return (

            /**
             * 
             * se podria crear un estado para cada componente y enviar por props para poder comparar en componentDidUpdate
             *  de cada componte con su nuevo estado y variable
             */

            <>


                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Bienvenido" onSelect={handleSelect}>
                    <Row>
                        <Col sm={2}>
                            <div className='dashboard'>
                                <ListGroup>
                                    {modulos && this.renderModulos()}
                                </ListGroup>
                            </div>
                        </Col>
                        <Col sm={10}>
                            <div className='principal'>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#Bienvenido">
                                        <Bienvenido />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#Clientes">
                                        <Clientes />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#Productos">
                                        <Productos />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#Orden_Compras">
                                        <Orden_Compras actualizar={this.state.estado} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#Pedidos">
                                        <Pedidos actualizar={this.state.estado} />
                                    </Tab.Pane>


                                </Tab.Content>
                            </div>
                        </Col>

                    </Row>
                </Tab.Container>
            </>
        )


    }

    renderModulos() {
        const { data, current_page, per_page, total, to, from } = this.state.modulos;
        return (
            <>
                {data.map((mod, index) => {
                    //console.log(data);
                    return (
                        <ListGroup.Item key={index} variant={null} action href={mod.modulo_event_key}>
                            <i className={mod.modulo_icono}></i>{mod.modulo_nombre}
                        </ListGroup.Item>
                    )
                })}

            </>
        );
    }

    renderAccionesModulos() {
        const { data, current_page, per_page, total, to, from } = this.state.modulos;
        return (
            <>
                {data.map((mod, index) => {
                    console.log(data);
                    return (

                        <Tab.Pane key={index} eventKey={mod.modulo_event_key}>
                            {mod.modulo_descripcion}
                        </Tab.Pane>
                    )
                })}


            </>
        );

    }
}
export default Menu;
if (document.getElementById('root')) {
    ReactDOM.render(<Menu />, document.getElementById('root'));
}

