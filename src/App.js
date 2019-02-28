import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Saludo from './Funcional';
// import Estado from './Estado';
// import LifeCicle from './LifeCicle'
// import HOC from './HOC'
// import RenderProps from './RenderProps'
// import Collection from './RenderProps'

const FunctionAsAChild = ({children, ...props}) => <div {...props}>{children(new Date().toString(),'Jose')}</div>

// Otro método
// class App extends React.Component {
class App extends Component {
  constructor () {
    super();
    this.name = 'App';
    // similar a la alternativa 2
    this.nombrarApp = this.nombrarApp.bind(this);
    this.state = {pintar: true}
  }
  render() {
    // Esta condición se ve afectada por componentDidMount
    // if (!this.state.pintar) return null;
    return (
      // esto es erroneo, no se tiene acceso a this.name
      // <Saludo saludar={this.nombrarApp}>
      // alternativa 1
      // <Saludo saludar={() => this.nombrarApp()}>
      // alternativa 2 o constructor
      // <Saludo saludar={this.nombrarApp.bind(this)}>
      // alternativa 3
      // <Saludo saludar={this.nombrarApp}>
      //  {/* <b>Pere</b> */}
      // </Saludo>
      // <Estado />
      // <LifeCicle />
      // <HOC onClick={() => alert('clicked')}/>
      // <RenderProps />
      // <Collection items={['Aitor', 'German']} render={nombre => <span>El alumno se llama {nombre}</span>} />
      <FunctionAsAChild onClick={() => alert('clicked')}>
        {
          (date,pepe) => <p>la fecha es {date}{pepe}</p>
        }
      </FunctionAsAChild>
    );
  }
  // esto es para comprobar que LifeCicle deja de ejecutarse y llama a componentWillUnmount
  componentDidMount () {
    setTimeout(
      () => this.setState({pintar: false}),
      5000
    )
  }
  // alternativa 3 para mantener this, con arrow function
  nombrarApp = () => {
    alert('hola ' + this.name);
  }
}

export default App;
