import React from 'react'
import {Redirect} from 'react-router'
import Author from './js/Author'
import AddPost from './js/AddPost'

import './css/Profile.css'
import LoginContext from './LoginContext';

class Profile extends React.Component {
  state = {showingForm: false}
  render() {
    return (
      <LoginContext.Consumer>
        {
          ({user, posts, addPost}) =>
              <div className='profile'>
                <Author details={{
                  ...user,
                  posts: posts[user.login.uuid],
                  following: true
                }}>
                  <button onClick={this.showForm}>Add post</button>
                  {
                    this.state.showingForm &&
                      <AddPost
                        onCancel={this.hideForm}
                        onSubmit={post => {
                          addPost(post)
                          this.hideForm()
                        }}/>
                  }
                </Author>
              </div>
        }
      </LoginContext.Consumer>
    )
  }
  showForm = () => {
    this.setState({showingForm: true})
  }
  hideForm = () => {
    this.setState({showingForm: false})
  }
}
  
export default Profile
