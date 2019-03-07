import React from 'react'
import {Switch, Route} from 'react-router'

import Authors from './Authors'
import Profile from './Profile'
import Login from './Login'
import AuthorProfile from './AuthorProfile'
import Requests from './Requests'
import RequiresLogin from './requiresLogin';

const requiresLogin = RequiresLogin('/login')

export default () =>
<Switch>
  {/* component estaría creando un componente anónimo con Authors. Render renderiza directamente Author */}
  {/* <Route exact path="/" component={() => <Authors logged={props.logged} />} /> */}
  {/* <Route exact path="/" render={() => <Authors logged={props.logged} />} /> */}
  <Route exact path="/" render={requiresLogin(Authors)} />
  <Route exact path="/login" component={Login} />
  <Route exact path="/profile" component={requiresLogin(Profile)} />
  <Route exact path="/profile/:uuid" component={requiresLogin(AuthorProfile)} />
  <Route exact path="/subscribers" component={Requests} />
  <Route component={props => <p>Error 404, no hemos encontrado lo que buscas</p>} />
</Switch>