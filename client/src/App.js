
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import GoogleBtn from './GoogleBtn';

class App extends Component {
  state = {
    response: {}
  };

  componentDidMount() {
    axios.get('/api/v1/say-something').then((res) => {
      const response = res.data;
      this.setState({ response });
    });
  }

  clickbtn() {
    console.log("button clicked");
    axios.get('/new').then((res) => {
      console.log("got ans")
    });
  };


  getEntry() {
    axios.get('/get').then((res) => {
      console.log("got ans!")
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="App">
        <br></br>
        <GoogleBtn></GoogleBtn>
        <h1>Finance App</h1>
        <h1>{this.state.response.body}</h1>
        <button onClick={this.clickbtn}>Add entry</button>
        <button onClick={this.getEntry}>Get entry</button>
      </div>
    );
  }
}

export default App;