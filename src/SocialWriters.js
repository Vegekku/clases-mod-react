import React from 'react'

import Nav from './Nav'
import Routes from './Routes'
// import {Redirect} from 'react-router'

import LoginContext from './LoginContext'

// const {Provider} = LoginContext

export default class extends React.Component {
  state = {logged: Boolean(localStorage.getItem('user'))}
  render () {
    // Esto crea una redirección continua, además hay partes de la aplicación que tienen que ser accesibles sin login, como el propio login
    // if (!logged) {
    //   return <Redirect to='/login' />
    // }
    return (
      // <>
        // {/* Cualquier cosa que esté dentro de Provider tendrá acceso a Consumer */}
        <LoginContext.Provider value={{
          logged: this.state.logged,
          login: this.login,
          logout: this.logout
        }}>
          <Nav />
          <Routes />
        </LoginContext.Provider>
        // {/* Con Provider ya no es necesario pasar logged como parámetro */}
        // {/* <Routes logged={this.state.logged} /> */}
      // </>
    )
  }
  login = user => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState({logged: true})
  }
  logout = () => {
    this.setState({logged: false})
    localStorage.removeItem('user')
  }
}

// export default props =>
//   <>
//     <Nav />
//     <Routes />
//   </>

// Estas dos expresiones son equivalentes:
// <> y <React.Fragment>
// Pero solo React.Fragment puede tener props (por ejemplo key)