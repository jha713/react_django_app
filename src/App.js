import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    blogs: [], // Initialize an empty array to store fetched blog posts
    newBlog: {
      title: '',
      content: '',
      author: ''
    },
    editingBlogId: null
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get('https://django-server-production-6614.up.railway.app/api/posts/')
      .then((res) => {
        // Update state with fetched blog posts
        this.setState({ blogs: res.data });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      newBlog: {
        ...this.state.newBlog,
        [e.target.name]: e.target.value
      }
    });
  };

  createBlog = () => {
    axios
      .post('https://django-server-production-6614.up.railway.app/api/posts/', this.state.newBlog)
      .then((res) => {
        // Refresh the list of blog posts after creating a new one
        this.refreshList();
        // Clear the input fields
        this.setState({
          newBlog: {
            title: '',
            content: '',
            author: ''
          }
        });
      })
      .catch((err) => console.log(err));
  };

  deleteBlog = (id) => {
    axios
      .delete(`https://django-server-production-6614.up.railway.app/api/posts/${id}/`)
      .then((res) => {
        // Refresh the list of blog posts after deleting one
        this.refreshList();
      })
      .catch((err) => console.log(err));
  };

  editBlog = (blog) => {
    this.setState({ editingBlogId: blog.id, newBlog: { ...blog } });
  };

  updateBlog = () => {
    axios
      .put(`https://django-server-production-6614.up.railway.app/api/posts/${this.state.editingBlogId}/`, this.state.newBlog)
      .then((res) => {
        // Refresh the list of blog posts after updating one
        this.refreshList();
        // Clear the input fields and reset editing state
        this.setState({
          newBlog: {
            title: '',
            content: '',
            author: ''
          },
          editingBlogId: null
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { blogs, newBlog, editingBlogId } = this.state;

    // Conditional rendering for update form
    let form;
    if (editingBlogId !== null) {
      form = (
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newBlog.title}
            onChange={this.handleChange}
          />
          <br />
          <textarea
            placeholder="Content"
            name="content"
            value={newBlog.content}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={newBlog.author}
            onChange={this.handleChange}
          />
          <br />
          <button class="btn btn-warning" onClick={this.updateBlog}>Update</button>
        </div>
      );
    } else {
      // Render create form if not in editing mode
      form = (
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newBlog.title}
            onChange={this.handleChange}
          />
          <br />
          <textarea
            placeholder="Content"
            name="content"
            value={newBlog.content}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={newBlog.author}
            onChange={this.handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={this.createBlog}>
            Create Blog
          </button>
        </div>
      );
    }

    // Map over the fetched blog posts to display them
    const blogList = blogs.map((blog) => (
      <div key={blog.id} className="blog-item">
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <p>Author: {blog.author}</p>
        <p>Date Created: {blog.date_created}</p>
        <div>
          {/* Buttons for edit and delete */}
          <button type='button' class="btn btn-info " style={{margin:'0px 5px'}} onClick={() => this.editBlog(blog)}>Edit</button>
          <button type="button" class="btn btn-danger" onClick={() => this.deleteBlog(blog.id)}>Delete</button>
        </div>
      </div>
    ));

    return (
      <div className="App">
        <main>

            <div className="row" style={{margin:'10px 40px'}}>
              <div className='col-md-12'><h3>Blog App</h3></div>
              
              <div className="col-md-4">
                {/* Render the form */}
                <div className="form-container">
                  {form}
                </div>
              </div>
              <div className="col-md-8">
                {/* Display the fetched blog posts */}
                {blogList}
              </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;
