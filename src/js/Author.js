import React from 'react'
import PropTypes from 'prop-types'
import '../css/Author.css'
import Post from './Post'

const Author = ({postCount, ...props}) =>
  <div className='author'>
    <img className='author__pic' src={props.details.picture.large} alt={`${props.details.name.first} ${props.details.name.last}`} />
    <h1 className='author__name'>{`${props.details.name.first} ${props.details.name.last}`}</h1>
    {
      props.children
    }
    <div>{postCount}</div>
    {
      props.details.following &&
      (
        props.details.posts.length > 0
        ? (
          <ul className='posts'>
            {
              props.details.posts.map(post =>
                <li key={post.date.valueOf()} className='posts__post'>
                  <Post title={post.title} date={post.date}>{post.content}</Post>
                </li>
              )
            }
          </ul>
        )
        : (
          <p>There are no posts yet...</p>
        )
      )
      
    }
  </div>

// Prop Types
Author.propTypes = {
  postCount: PropTypes.number,
  details: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.date
    }))
  })
}
// Forma por defecto de React
// Author.defaultProps = {
//   postCount: 42
// }

export default Author