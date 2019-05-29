import React from 'react'

import {connect} from 'react-redux'
import {incr,decr,add} from './reduxStore'
import PropTypes from 'prop-types'

const AddRandomQuantity = connect(
  null,
  dispatch => ({
    onAdd: qty => dispatch(add(qty))
  })
)(
class extends React.Component {
  state = {value: 0}
  render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.update} />
        <button onClick={this.addQuantity}>Add</button>
      </div>
    )
  }
  update = event => this.setState({value: Number(event.target.value)}
  )
  addQuantity = () =>
    this.props.onAdd(this.state.value)
})

const Contador = props =>
  <div>
    <p>el valor del contador es {props.contador}</p>
    <button onClick={props.inc}>+</button>
    <button onClick={props.dec}>-</button>
    <AddRandomQuantity />
  </div>

Contador.propTypes = {
  contador: PropTypes.number.isRequired,
  inc: PropTypes.func.isRequired,
  dec: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  inc: () => dispatch(incr()),
  dec: () => dispatch(decr())
})

const mapStateToProps = state => ({
  contador: state.count
})

// const ConnectedContador = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Contador)

// export default ConnectedContador

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contador)