import React from 'react'

import Nav from './Nav'
import Routes from './Routes'

export default props =>
  <>
    <Nav />
    <Routes />
  </>

// Estas dos expresiones son equivalentes:
// <> y <React.Fragment>
// Pero solo React.Fragment puede tener props (por ejemplo key)