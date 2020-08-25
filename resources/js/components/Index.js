import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import Menu from "./Menu";
import Clientes from "./Clientes";
import Bienvenido from "./Bienvenido";
import Productos from "./Productos";
import AgendaMedica from "./agendaMedica/AgendaMedica";





const Index = () => {
  return (


     <Router>
         <Switch>
           <Route exact path="/" component={Menu} exact/>
           {/* <Route exact path="/Menu" component={Menu} exact /> */}
           <Route exact path="/Clientes" component={Clientes} exact />
           <Route exact path="/Bienvenido" component={Bienvenido} exact />
           <Route exact path="/agendaMedica/AgendaMedica" component={AgendaMedica} exact />
           <Route exact path="/Productos" component={Productos} exact />
           
         </Switch>

    </Router>

     /*<Router>
       <div>
         <Route exact path="/" component={Principal} />
         <Route exact path="/Menu" component={Menu} />
         <Route exact path="/Clientes" component={Clientes} />
      </div>
    </Router>*/
  );
};

export default Index;



