import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import IntegraServer from './IntegraServer'

class AuthenticatedRoute extends Component {
    render() {
        if (IntegraServer.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute