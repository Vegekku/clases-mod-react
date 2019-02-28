import React from 'react'
// HQC = es una función que recibe un componente, y devuelve un nuevo componente
const withDate = Component => class extends React.Component {
  displayName = 'withDate'
  // cuando se monta el componente
  state = {date: new Date()}
  render() {
    return <Component {...this.props} date={this.state.date.toString()}></Component>
  }
}

export default withDate