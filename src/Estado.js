import React from 'react';

class Estado extends React.Component {
  state = {clickCount: 0}
  render () {
    const {clickCount} = this.state;
    return <button onClick={this.updateCount}>Clickado {clickCount} veces</button>
  }
  // El problema de setState, es que puede colarse otro setState
  // updateCount = () => this.setState({clickCount: 1})
  updateCount = () => this.setState(state => ({clickCount: state.clickCount + 1}))
}

export default Estado;