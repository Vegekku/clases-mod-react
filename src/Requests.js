import React from 'react'

import Showcase from './js/Showcase'
import Author from './js/Author';

// desechamos RequestUI para reducir el arbol de componentes, con lo cual mejora el rendimiento
// const RequestsUI = props =>
//   <Showcase items={props.requests} keyFn={author => author.uuid} render={author =>
//     <Author details={author}>
//       <button onClick={() => props.onAccept(author)}>Accept</button>
//       <button onClick={() => props.onDecline(author)}>Decline</button>
//     </Author>
//   } />

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100'

class Requests extends React.Component {
  state = {loading: true}
  async componentDidMount() {
    const response = await fetch(USERS_URL)
    const { results: authors } = await response.json()
    const requests = (JSON.parse(
      localStorage.getItem('requests')
    ) || {}
    )['1cd1e622-12bb-4b35-a2c9-63ff7bda6c73'] || []
    const authorsRequesting = requests.map(uuid =>
      authors.find(author => author.login.uuid === uuid)
    )
    this.setState({requests: authorsRequesting, loading: false})
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    return (
      // <RequestsUI requests={this.state.requests} onAccept={this.accept} onDecline={this.decline} />
      <Showcase items={this.state.requests} keyFn={author => author.login.uuid} render={author =>
        <Author details={author}>
          <button onClick={() => this.accept(author)}>Accept</button>
          <button onClick={() => this.decline(author)}>Decline</button>
        </Author>
      } />
    )
  }
  accept = author =>  {
    const followers = JSON.parse(localStorage.getItem('followers')) || {}
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const currentFollowers = followers[loggedUser.login.uuid]
    followers[loggedUser.login.uuid] = [
      ...currentFollowers,
      author.login.uuid
    ]
    localStorage.setItem('followers', JSON.stringify(followers))
  }
  decline = author => {
    const followers = JSON.parse(localStorage.getItem('followers')) || {}
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const currentFollowers = followers[loggedUser.login.uuid]
    followers[loggedUser.login.uuid] = currentFollowers.filter(uuid => uuid !== author.login.uuid)
    localStorage.setItem('followers', JSON.stringify(followers))
  }
}

export default Requests