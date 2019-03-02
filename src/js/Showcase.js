import React from 'react'
import '../css/Showcase.css'

// BEM css -> Block__Element--Modifier
// para el caso: showcase, showcase__item, showcase__item--feature
const Showcase = props =>
  <ul className='showcase'>
    {
      props.items.map(item => 
        <li key={props.keyFn(item)} className='showcase__item'>
          {props.render(item)}
        </li>  
      )
    }
  </ul>

export default Showcase