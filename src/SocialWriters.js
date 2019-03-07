import React from 'react'

import Nav from './Nav'
import Routes from './Routes'
// import {Redirect} from 'react-router'

import LoginContext from './LoginContext'

// const {Provider} = LoginContext

export default class extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem('user')),
    posts: JSON.parse(localStorage.getItem('posts')) || {}
  }
  render () {
    // Esto crea una redirección continua, además hay partes de la aplicación que tienen que ser accesibles sin login, como el propio login
    // if (!logged) {
    //   return <Redirect to='/login' />
    // }
    return (
      // <>
        // {/* Cualquier cosa que esté dentro de Provider tendrá acceso a Consumer */}
        <LoginContext.Provider value={{
          logged: Boolean(this.state.user),
          user: this.state.user,
          posts: this.state.posts,
          login: this.login,
          logout: this.logout,
          addPost: this.addPost
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
    this.setState({user})
  }
  logout = () => {
    this.setState({user: null})
    localStorage.removeItem('user')
  }
  addPost = post => {
    post.date = new Date()
    const previousState = this.state
    const uuid = previousState.user.login.uuid
    const nextState = {
      ...previousState,
      posts: {
        ...previousState.posts,
        [uuid]: [
          post,
          ...previousState.posts[uuid],
        ]
      }
    }
    this.setState(nextState)
    localStorage.setItem(
      'posts',
      JSON.stringify(nextState.posts)
    )
  }
}