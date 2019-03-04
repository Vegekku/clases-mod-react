import React from 'react'
import Author from './js/Author'

import './css/Profile.css'

const SAMPLE_AUTHOR = {
  picture: {
    large: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  name: {
    first: 'Louane',
    last: 'Vidal'
  },
  posts: [
    { date: new Date(), title: 'First', content: 'First content' },
    { date: new Date(), title: 'Second', content: 'Second content' }
  ]
}

class AuthorProfile extends React.Component {
  state = {following: false}
  constructor() {
    super()
    this.follow = this.follow.bind(this)
  }
  render() {
    const {following} = this.state
    return (
      <div className='profile'>
        <Author details={{
          ...SAMPLE_AUTHOR,
          following,
        }}>
          {
            !following &&
            <button onClick={this.follow}>Suscribirse</button>
          }
        </Author>
      </div>
    )
  }
  follow() {
    this.setState({following: true})
  }
}
  
export default AuthorProfile
