import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    blogs: [] // Initialize an empty array to store fetched blog posts
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

  createUser = () => {
    console.log('Create blog');
  };

  render() {
    // Map over the fetched blog posts to display them
    const blogList = this.state.blogs.map((blog) => (
      <div key={blog.id}>
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <p>Author: {blog.author}</p>
        <p>Date Created: {blog.date_created}</p>
      </div>
    ));

    return (
      <div className="App">
        <main>
          <div className="container">
            <h1>User App</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <button className="btn btn-primary" onClick={this.createBlog}>
                    Create Blog
                  </button>
                </div>
              </div>
            </div>
            {/* Display the fetched blog posts */}
            {blogList}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
