import React from 'react'

// Los formularios siempre son clases (por su propio funcionamiento y estados)
class AddPost extends React.Component {
  state = {
    title: '',
    content: ''
  }
  constructor() {
    super()
    this.setTitle = this.setTitle.bind(this)
    this.setContent = this.setContent.bind(this)
  }
  render() {
    const {title,content} = this.state
    return (
      <form onSubmit={event => event.preventDefault() }>
        <p>Publish new Message</p>
        <label>
          Title: 
          <input type='text' value={title} onChange={this.setTitle} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={this.setContent}/>
        </label>
        <div>
          <button onClick={this.publish.bind(this)}>Publish</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      </form>
    )
  }
  setTitle(event) {
    this.setState({title: event.target.value})
  }
  setContent(event) {
    this.setState({content: event.target.value})
  }
  publish() {
    const {title, content} = this.state
    this.props.onSubmit({title, content})
  }
}

export default AddPost