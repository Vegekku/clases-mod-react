import React from 'react'
import '../css/Author.css'
import Post from './Post'

export default props => 
  <div className='author'>
    <img className='author__pic' src={props.details.picture.large} alt={`${props.details.name.first} ${props.details.name.last}`} />
    <h1 className='author__name'>{`${props.details.name.first} ${props.details.name.last}`}</h1>
    {
      props.children
    }
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