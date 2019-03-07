import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import './App.css';

import Showcase from './js/Showcase'
import Author from './js/Author'
import LoginContext from './LoginContext';

// const AUTHORS = Array.from({length: 10}).map((_, index) => ({
//   id: `author-${index}`,
//   name: 'Author',
//   pic: 'http://placehold.it/128x128'
// }))
const RANDOMUSERS = 'https://randomuser.me/api?seed=abc&results=100'
class Authors extends React.Component {
  state = { authors: [], loading: false }
  async componentDidMount() {
    this.setState({ loading: true })
    // if (!localStorage.getItem('user')) {
    //   return this.setState({logged: true})
    // }
    try {
      const response = await fetch(RANDOMUSERS)
      const {results} = await response.json()
      // debugger
      this.setState({authors: results})
    } catch (error) {
      this.setState({error})
    } finally {
      // finally se ejecuta SIEMPRE al final
      this.setState({ loading: false })
    }
  }
  render() {
    const {authors, loading, error} = this.state
    const {logged} = this.props
    // Queremos evitar controlar esto en cada componente, por eso lo hacemos en SocialWriters
    // if (!logged) {
    //   return <Redirect to='/login' />
    // }

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>Error 500!</p>
    }

    return (
      <LoginContext.Consumer>
        {
          ({logged}) =>
            logged
            ? <Showcase keyFn={author => author.login.uuid} items={authors} render={author =>
              <Link to={`/profile/${author.login.uuid}`} >
                <Author details={author} />
              </Link>
            } />
            : <Redirect to='/login' />
        }
      </LoginContext.Consumer>
      
    )
  }
}

export default Authors;
