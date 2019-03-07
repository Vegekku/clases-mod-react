import React from 'react'
import {NavLink} from 'react-router-dom'

import './css/Nav.css'

export default props =>
  <nav className="menu">
    <ul className="menu__options">
      <li className="menu__option">
        <NavLink exact activeClassName="menu__link--active" to="/" className="menu__link">Authors</NavLink>
      </li>
      <li className="menu__option">
        <NavLink activeClassName="menu__link--active" to="/profile" className="menu__link">Profile</NavLink>
      </li>
      <li className="menu__option">
        <NavLink activeClassName="menu__link--active" to="/subscribers" className="menu__link">Subscribers</NavLink>
      </li>
      <li className="menu__option" onClick={logout}>Logout</li>
    </ul>
  </nav>

  const logout = () => localStorage.removeItem('user')