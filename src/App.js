import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
 
const Blog = [
  {
      "id": 1,
      "title": "Python",
      "content": "Python is the most used language in top company",
      "author": "Abhishek",
      "date_created": "2024-03-08T13:20:29.298153Z"
  },
  {
      "id": 2,
      "title": "Java",
      "content": "Java is the most used language in top company",
      "author": "Amit",
      "date_created": "2024-03-08T13:21:01.810070Z"
  },
  {
      "id": 3,
      "title": "MySql",
      "content": "most comman data container",
      "author": "abhi",
      "date_created": "2024-03-18T05:54:13.653406Z"
  }
]
 
 
class App extends Component {
 
  componentDidMount() {
    this.refreshList()
  }
 
  refreshList = () => {
    axios
    .get('https://django-server-production-6614.up.railway.app/api/posts/')
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }
 
 
  createUser = () => {
    console.log('Crate user')
  }
 
  render() {
    return (
      <div className="App">
        <main>
          <div className='container'>
            <h1>User App</h1>
            <div className='row'>
              <div className='col-md-6'>
                <div className='mb-4'>
                  <button
                  className='btn btn-primary'
                  onClick={this.createUser}
                  >
                    Create Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
 
export default App;