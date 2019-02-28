import React from 'react'

const RenderProps = props => props.render(new Date())

const UseRenderProps = () => <RenderProps render={date => <p>{date.toString()}</p>} />

// export default UseRenderProps

const Collection = props => <ul>{ props.items.map(item => <li key={item}>{ props.render(item) }</li>) }</ul>

export default Collection