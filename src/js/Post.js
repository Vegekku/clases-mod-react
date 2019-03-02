import React from 'react'

export default props =>
  <div>
    <h2>
      {props.title}
      <small>{props.date.toString()}</small>
    </h2>
    <p>{props.children}</p>
  </div>