import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class TrainerApp extends Component {
  constructor(props) {
      super(props);
   
      this.state = {
          errors: {},
          data: {}
      };
  }
  render() {
    var user_tpl, username;

    if(this.props.currentUser){
      username = this.props.currentUser.username || this.props.currentUser.services.facebook.name;
      user_tpl =  <li className="dropdown">
                    <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{username} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      
                      <li><a href={'/users/'+Meteor.userId()}>Perfil</a></li>
                      <li><a href={'/gyms/'+Meteor.userId()}>Gimnasio</a></li>
                      <li><a href="/logout">Salir</a></li>
                    </ul>
                  </li>;
    }else{
      user_tpl = <li className="dropdown">
                    <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Usuario <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><AccountsUIWrapper /></li>
                    </ul>
                  </li>;
    }
    return (<div>
              <nav className="navbar navbar-default">  
                <div className="container-fluid"> 
                  <div className="navbar-header"> 
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-8" aria-expanded="false"> 
                      <span className="sr-only">Toggle navigation</span> 
                      <span className="icon-bar"></span> 
                      <span className="icon-bar"></span> 
                      <span className="icon-bar"></span> 
                    </button> 
                    <a className="navbar-brand" href="#">Trainer</a> 
                  </div>  
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-8"> 
                    <ul className="nav navbar-nav">
                      <li className="active">
                        <a role="button" href="/calendar" >Calendario</a>
                      </li> 
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle" 
                          data-toggle="dropdown" 
                          role="button" 
                          aria-haspopup="true" 
                          aria-expanded="false">
                            Rutinas
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="/routines">Lista</a></li>
                          <li><a href="/routines/add">Crear Nueva</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown" 
                          role="button" 
                          aria-haspopup="true" 
                          aria-expanded="false">
                            Ejercicio
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="/exercises">Ejercicios</a></li>
                          <li><a href="/exercises/add">Crear Ejercicio</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown" 
                          role="button" 
                          aria-haspopup="true" 
                          aria-expanded="false">
                            Gimnasios
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="/gyms">Lista</a></li>
                          <li><a href="/gyms/add">Nuevo</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown" 
                          role="button" 
                          aria-haspopup="true" 
                          aria-expanded="false">
                            Alumnos
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="/clients">Lista</a></li>
                          <li><a href="/clients/add">Nuevo</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle" 
                          data-toggle="dropdown" 
                          role="button" 
                          aria-haspopup="true" 
                          aria-expanded="false">
                            Turnos
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a href="/turns">Lista</a></li>
                          <li><a href="/turns/add">Crear Nueva</a></li>
                        </ul>
                      </li>
                      {user_tpl}
                    </ul> 
                  </div> 
                </div> 
              </nav>
              <div id="render-target"></div>
            </div>);
    }
}

TrainerApp.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, TrainerApp);