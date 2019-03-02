import React from 'react'
import Author from './js/Author'
import Post from './js/Post'
import AddPost from './js/AddPost'

import './css/Profile.css'

const SAMPLE_AUTHOR = {
  picture: {
    large: 'https://randomuser.me/api/portraits/women/88.jpg'
  },
  name: {
    first: 'Louane',
    last: 'Vidal'
  } 
}

class Profile extends React.Component {
  state = {showingForm: false, posts: []}
  constructor() {
    super()
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
  }
  render() {
    return (
      <div className='profile'>
        <Author details={SAMPLE_AUTHOR} />
        <button onClick={this.showForm}>Add post</button>
        {
          this.state.showingForm && <AddPost onCancel={this.hideForm} onSubmit={this.addPost.bind(this)}/>
        }
        <ul className='posts'>
          {
            this.state.posts.map(post =>
              <li key={post.date.valueOf()} className='posts__post'>
                <Post title={post.title} date={post.date}>{post.content}</Post>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
  showForm() {
    this.setState({showingForm: true})
  }
  hideForm() {
    this.setState({showingForm: false})
  }
  addPost(post) {
    post.date = new Date()
    this.setState(previousState => {
      return {
        ...previousState,
        posts: [
          post,
          ...previousState.posts,
        ]
      }
    })
    this.hideForm()
  }
}
  
export default Profile
