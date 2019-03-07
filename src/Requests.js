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
    // TODO TryCatch para error 500
    const response = await fetch(USERS_URL)
    const { results: authors } = await response.json()
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const requests = (JSON.parse(
      localStorage.getItem('requests')
    ) || {}
    )[loggedUser.login.uuid] || []
    const authorsRequesting = requests.map(uuid =>
      authors.find(author => author.login.uuid === uuid)
    )
    this.setState({requests: authorsRequesting, loading: false})
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    // TODO Controlar error 500
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
    const currentFollowers = followers[loggedUser.login.uuid] || []
    followers[loggedUser.login.uuid] = [
      ...currentFollowers,
      author.login.uuid
    ]
    localStorage.setItem('followers', JSON.stringify(followers))
    this._removeRequest(author)
  }
  decline = author => {
    this._removeRequest(author)
    // const followers = JSON.parse(localStorage.getItem('followers')) || {}
    // const loggedUser = JSON.parse(localStorage.getItem('user'))
    // const currentFollowers = followers[loggedUser.login.uuid] || []
    // followers[loggedUser.login.uuid] = currentFollowers.filter(uuid => uuid !== author.login.uuid)
    // localStorage.setItem('followers', JSON.stringify(followers))
  }
  _removeRequest = author => {
    const requests = (JSON.parse(localStorage.getItem('requests'))) || {}
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const pendingRequests = requests[loggedUser.login.uuid] || []
    const filteredRequests = pendingRequests.filter(uuid => uuid !== author.login.uuid)
    requests[loggedUser.login.uuid] = filteredRequests
    localStorage.setItem('requests', JSON.stringify(requests))

    this.setState(previousState => ({
      requests: previousState.requests.filter(authorRequest => authorRequest !== author.login.uuid)
    }))
  }
}

export default Requests