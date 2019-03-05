import React from 'react'

import Showcase from './js/Showcase'
import Author from './js/Author';

const SAMPLE_REQUESTS = [
  {
    uuid: '21345678',
    name: {
      first: 'nombre',
      last: 'apellido'
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/88.jpg'
    }
  },
  {
    uuid: '213456789',
    name: {
      first: 'nombre',
      last: 'apellido'
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/88.jpg'
    }
  },
  {
    uuid: '213456780',
    name: {
      first: 'nombre',
      last: 'apellido'
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/88.jpg'
    }
  }
]

// desechamos RequestUI para reducir el arbol de componentes, con lo cual mejora el rendimiento
// const RequestsUI = props =>
//   <Showcase items={props.requests} keyFn={author => author.uuid} render={author =>
//     <Author details={author}>
//       <button onClick={() => props.onAccept(author)}>Accept</button>
//       <button onClick={() => props.onDecline(author)}>Decline</button>
//     </Author>
//   } />

class Requests extends React.Component {
  state = { requests: SAMPLE_REQUESTS }
  render() {
    return (
      // <RequestsUI requests={this.state.requests} onAccept={this.accept} onDecline={this.decline} />
      <Showcase items={this.state.requests} keyFn={author => author.uuid} render={author =>
        <Author details={author}>
          <button onClick={() => this.accept(author)}>Accept</button>
          <button onClick={() => this.decline(author)}>Decline</button>
        </Author>
      } />
    )
  }
  accept = author => 
    this.setState(previousState => ({
      requests: previousState.requests.filter(otherAuthor => otherAuthor.uuid !== author.uuid)
    }))
  decline = author => this.accept(author)
}

export default Requests