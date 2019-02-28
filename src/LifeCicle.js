import React from 'react';

/*
esto es equivalente a 
const loquesea || class loquesea
...
export default loquesea
*/
export default class extends React.Component {
  state = { currentTime: new Date() }
  render () {
    return <div>La hora es: {this.state.currentTime.toString()}</div>
  }
  // esto controla si se actualiza o no
  // shouldComponentUpdate () { return false }
  componentDidMount () {
    this.updateInterval = setInterval (
      () => this.setState({currentTime: new Date()}),
      1000
    )
  }
  componentDidUpdate () {
    console.log('actualizado');
  }
  // esto hace que cuando el componente termine, deje de ejecutarse
  componentWillUnmount () {
    clearInterval (this.updateInterval)
  }
}