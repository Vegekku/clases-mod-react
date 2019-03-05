import React from 'react'
import {Switch, Route} from 'react-router'

import Authors from './Authors'
import Profile from './Profile'
import Login from './Login'
import AuthorProfile from './AuthorProfile'
import Requests from './Requests'

export default props =>
<Switch>
  <Route exact path="/" component={Authors} />
  <Route exact path="/login" component={Login} />
  <Route exact path="/profile" component={Profile} />
  <Route exact path="/profile/:uuid" component={AuthorProfile} />
  <Route exact path="/subscribers" component={Requests} />
  <Route component={props => <p>Error 404, no hemos encontrado lo que buscas</p>} />
</Switch>