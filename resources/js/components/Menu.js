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

        }

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

    render() {
        const { modulos } = this.state;

        return (
            <>

                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Bienvenido">
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
                                    <Tab.Pane eventKey="#Agenda">
                                        <AgendaMedica />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#Pedidos">
                                        <Pedidos />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#Productos">
                                        <Productos/>
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
    if(document.getElementById('root')) {
    ReactDOM.render(<Menu />, document.getElementById('root'));
}

