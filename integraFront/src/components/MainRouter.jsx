import React, { Component } from 'react';
import LoginComponent from './LoginComponent'
import HomeComponent from './HomeComponent'
import ListMenuAssoc from './associacao/ListMenuAssoc'
import DetalhesAssociacao from './associacao/DetalhesAssociacao'
import CreateAssoc from './associacao/CreateAssoc'
import EditAssoc from './associacao/EditAssoc'

import ListMenuAtend from './atendimento/ListMenuAtend'
import DetalhesAtend from './atendimento/DetalhesAtend'
import EditAtend from './atendimento/EditAtend'

import ListMenuPaci from './paciente/ListMenuPaci'

import ListMenuApoia from './apoiador/ListMenuApoia'
import DetalhesApoia from './apoiador/DetalhesApoia'
import ContatoApoia from './apoiador/ContatoApoia'
import EditApoiador from './apoiador/EditApoiador'
import DoacaoApoia from './apoiador/DoacaoApoia'

import ListMenuConfig from './administracao/ListMenuConfig'
import CreateFunc from './administracao/CreateFunc'
import DetalhesFunc from './administracao/DetalhesFunc'

import ListMenuEstat from './estatistica/ListMenuEstat'

import DetalhesPaciente from './paciente/DetalhesPaciente'
import EditPaci from './paciente/EditPaci'
import AcompPaci from './paciente/AcompPaci'
import AssocPaci from './paciente/AssocPaci'

import ErrorComponent from './ErrorComponent'
import {Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from '../store'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'

const store = configureStore(/* provide initial state if any */)

class MainRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            serverResponse: []
        }
    }

    render() {
        return(
          <div className='MainRouter'>
            <Provider store={store}>
                <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
                    <Switch>                
                        <Route path="/" exact render={() => (<LoginComponent/>)}/>
                        <Route path="/login" render={() => (<LoginComponent/>)}/>
                        <AuthenticatedRoute path="/home/:name" render={() => (<HomeComponent/>)}/> 
                        <AuthenticatedRoute path="/home" render={() => (<HomeComponent server={this.state}/>)}/>
                        <AuthenticatedRoute path="/assoc" exact render={() => (<ListMenuAssoc server={this.state}/>)}/>
                        <AuthenticatedRoute path="/assoc/create" exact render={() => (<CreateAssoc server={this.state}/>)}/>
                        <AuthenticatedRoute path="/assoc/:id" exact render={() => (<DetalhesAssociacao server={this.state}/>)}/>
                        <AuthenticatedRoute path="/assoc/edit/:id" exact render={() => (<EditAssoc server={this.state}/>)}/>
                        <AuthenticatedRoute path="/atend" exact render={() => (<ListMenuAtend server={this.state}/>)}/>
                        <AuthenticatedRoute path="/atend/create" exact render={() => (<EditAtend server={this.state}/>)}/>
                        <AuthenticatedRoute path="/atend/:id" exact render={() => (<DetalhesAtend server={this.state}/>)}/>
                        <AuthenticatedRoute path="/atend/edit/:id" exact render={() => (<EditAtend try server={this.state}/>)}/>                     
                        <AuthenticatedRoute path="/paci" exact render={() => (<ListMenuPaci server={this.state}/>)}/>
                        <AuthenticatedRoute path="/paci/create" exact render={() => (<EditPaci server={this.state}/>)}/>
                        <AuthenticatedRoute path="/paci/:id" exact render={() => (<DetalhesPaciente server={this.state}/>)}/>
                        <AuthenticatedRoute path="/paci/:id/acomp" exact render={() => (<AcompPaci server={this.state}/>)}/>
                        <AuthenticatedRoute path="/paci/:id/associado" exact render={() => (<AssocPaci server={this.state}/>)}/>
                        <AuthenticatedRoute path="/paci/edit/:id" exact render={() => (<EditPaci try server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia" exact render={() => (<ListMenuApoia server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia/create" exact render={() => (<EditApoiador server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia/:id" exact render={() => (<DetalhesApoia try server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia/edit/:id" exact render={() => (<EditApoiador try server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia/:id" exact render={() => (<DetalhesApoia server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia/:id/contatos" exact render={() => (<ContatoApoia server={this.state}/>)}/>
                        <AuthenticatedRoute path="/apoia/:id/doacoes" exact render={() => (<DoacaoApoia server={this.state}/>)}/>
                        <AuthenticatedRoute path="/func" exact render={() => (<ListMenuConfig server={this.state}/>)}/>
                        <AuthenticatedRoute path="/func/create" exact render={() => (<CreateFunc server={this.state}/>)}/>
                        <AuthenticatedRoute path="/func/:id" exact render={() => (<DetalhesFunc try server={this.state}/>)}/>
                        <AuthenticatedRoute path="/func/edit/:id" exact render={() => (<CreateFunc try server={this.state}/>)}/>
                        <AuthenticatedRoute path="/dados" exact render={() => (<ListMenuEstat server={this.state}/>)}/> 
                        <Route render={() => (<ErrorComponent/>)}/>                       
                    </Switch>
                </ConnectedRouter>
            </Provider>
          </div>      
      );
    }   
}

export default MainRouter