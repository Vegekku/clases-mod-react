import React from 'react';
// class Saludo extends React.Component {
//   render() {
//     return <p>hola mundo</p>
//   }
// }
// cuando un componente solo tenga un render, mejor esta opción
const Saludo = props => <p onClick={props.saludar}>Hola {props.quien}</p>

const Saludo2 = ({saludar, children}) => <p onClick={saludar}>Hola {children}</p>
/*
Importando react, lo que se hace babel es traducirlo como
React.createElement('p', {}, 'Hola Mundo');
*/

export default Saludo2;