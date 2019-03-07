import React from 'react'
import Author from './js/Author'
import AddPost from './js/AddPost'

import './css/Profile.css'

class Profile extends React.Component {
  state = {showingForm: false, posts: [], loading: true}
  componentDidMount () {
    const details = JSON.parse(localStorage.getItem('user'))
    const posts = (JSON.parse(localStorage.getItem('posts')) || {})[details.login.uuid] || []

    this.setState({
      details,
      posts,
      loading: false
    })
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    return (
      <div className='profile'>
        <Author details={{
          ...this.state.details,
          posts: this.state.posts,
          following: true
        }}>
          <button onClick={this.showForm}>Add post</button>
          {
            this.state.showingForm && <AddPost onCancel={this.hideForm} onSubmit={this.addPost}/>
          }
        </Author>
      </div>
    )
  }
  componentDidUpdate (previousProps, previousState) {
    const posts = JSON.parse(localStorage.getItem('posts')) || {}
    posts[this.state.details.login.uuid] = this.state.posts
    localStorage.setItem(
      'posts',
      JSON.stringify(posts)
    )
    // debugger
  }
  showForm = () => {
    this.setState({showingForm: true})
  }
  hideForm = () => {
    this.setState({showingForm: false})
  }
  addPost = post => {
    post.date = new Date()
    // setState debe devolver exactamente lo que va a cambiar
    // para este caso podría obviarse el primer ...previousState, ya que este no cambia, solo cambia posts
    this.setState(previousState => {
      return {
        ...previousState,
        posts: [
          post,
          ...previousState.posts,
        ]
      }
    })
    // esto siempre pisa los posts
    // localStorage.setItem(
    //   'posts',
    //   JSON.stringify(post)
    // )
    this.hideForm()
  }
}
  
export default Profile
