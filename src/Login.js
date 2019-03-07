import React from 'react'

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100'

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
    const response = await fetch(USERS_URL)
    const {results: users } = await response.json()
    const found = users.find(candidate =>
      candidate.login.username === user &&
      candidate.login.password === password
    )
    this.setState({busy: false})
    if (!found) {
      return this.setState({loginError: true})
    }
    this.props.onSuccess(found)
    // alert(JSON.stringify(found))
  }
}

// se usaría así, y contiene la lógica de la propia aplicación
// import LoQueSea from 'Login'
// pero siempre sin las llaves, por ser default
export default props => 
  <Login onSuccess={storeLogin} />

const storeLogin = user =>
  localStorage.setItem('user', JSON.stringify(user))