import React from 'react'
import Author from './js/Author'

import './css/Profile.css'

const RANDOMUSERS = 'https://randomuser.me/api?seed=abc&results=100'
class AuthorProfile extends React.Component {
  state = {following: false, details: {}, loading: true}
  constructor() {
    super()
    this.follow = this.follow.bind(this)
  }
  // igual que en Author.js, pero sin async-await
  componentDidMount() {
    fetch(RANDOMUSERS)
      .then(response => response.json())
      .then(({results}) =>
        results.find(author =>
          author.login.uuid === this.props.match.params.uuid
        )
      )
      .then(details => this.setState({ details, loading: false }))
  }
  render() {
    const {following, details, loading} = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <div className='profile'>
        <Author details={{
          ...details,
          posts: [],
          following,
        }}>
          {/* { this.props.match.params.uuid } */}
          <button onClick={() => this.props.history.goBack()}>Go back</button>
          {
            !following &&
              <button onClick={this.follow}>Suscribirse</button>
          }
        </Author>
      </div>
    )
  }
  follow() {
    // TODO Actualmente el usuario puede volver a suscribirse. Habría que controlar que solo se suscriba una vez, y renderizar algún mensaje tipo "esperando aceptación"
    // TODO La duplicidad se controla aquí
    this.setState({following: true})
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const requests = JSON.parse(localStorage.getItem('requests')) || {}
    const currentRequests = requests[this.state.details.login.uuid] || []
    requests[this.state.details.login.uuid] = [
      ...currentRequests,
      loggedUser.login.uuid
    ]
    // en esta ocasión si puede quedarse aquí, porque solo se subscribe una vez
    localStorage.setItem(
      'requests',
      JSON.stringify(requests)
    )
  }
}
  
export default AuthorProfile
