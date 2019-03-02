import React from 'react'
import '../css/Author.css'

export default props => 
  <div className='author'>
    <img className='author__pic' src={props.details.picture.large} alt={`${props.details.name.first} ${props.details.name.last}`} />
    <h1 className='author__name'>{`${props.details.name.first} ${props.details.name.last}`}</h1>
  </div>