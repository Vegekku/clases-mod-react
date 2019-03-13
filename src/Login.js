import React from 'react'
import {Redirect} from 'react-router'
import LoginContext from './LoginContext';

// se importaría por
// import {Login} from 'Login'
export class Login extends React.Component {
  state = {user: '', password: ''}
  render() {
    // terms no está en state, por lo que es undefined. Al renderizar se convierte a false
    // const {user, password, terms, error, hasChange, loginError} = this.state
    const {user, password, error, hasChange, loginError, busy} = this.state

    return (
      <form onSubmit={this.login}>
        <label>
          Usuario:&nbsp;
          <input name='user' value={user} onChange={this.update}/>
        </label>
        <label>
          Contraseña:&nbsp;
          <input name='password' type="password" value={password} onChange={this.update}/>
        </label>
        {/* <label>
          Terms:&nbsp;
          <input name='terms' type='checkbox' value={terms} onChange={this.update} />
        </label> */}
        <button type="submit" disabled={busy || !hasChange}>Login</button>
        {
          error && 
            <p>Usuario y contraseña requeridos</p>
        }
        {
          loginError &&
            <p>Usuario o contraseña incorrectos</p>
        }
      </form>
    )
  }
  update = event => this.setState({
    error: false,
    hasChange: true,
    loginError: false,
    [event.target.name]: event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value
  })
  // updateUser = event => this.setState({user: event.target.value})
  // updatePassword = event => this.setState({password: event.target.value})
  login = async (event) => {
    // usaríamos joi para validar en lugar de hacerlo nosotros:
    // https://www.npmjs.com/package/joi
    event.preventDefault()
    const {user, password} = this.state
    if (user.trim().length === 0 || password.trim().length === 0) {
      return this.setState({error: true, hasChange: false})
    }
    this.setState({busy: true})
    try {
      // void es para indicar que no quiero obtener el resultado de la función
      void await this.props.onLogin({user, password})
    } catch (loginError) {
      return this.setState({loginError: true})
    } finally {
      this.setState({busy: false})
    }
  }
}

// se usaría así, y contiene la lógica de la propia aplicación
// import LoQueSea from 'Login'
// pero siempre sin las llaves, por ser default
export default props => 
  <LoginContext.Consumer>
    {
      ({login, logged}) =>
        logged
          ? <Redirect to='/' />
          : <Login onLogin={login} />
    }
  </LoginContext.Consumer>