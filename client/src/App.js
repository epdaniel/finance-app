import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import GoogleBtn from './GoogleBtn';
import Entry from './Entry';
import NewEntry from './NewEntry';
import UserProfile from './userProfile';


class App extends Component {
  state = {
    entries: []
  };

  loadAllEntries() {
    let id = UserProfile.getId();
    if (id !== -1) {
      axios.get('/entry/getAll', {
        headers: {
          'id': 1  //change to UserProfile.getId();
        }
      }).then((res) => {
        this.setState({ entries: res.data });
      });
    }
  }

  componentDidMount() {
    this.loadAllEntries();
  }


  render() {
    return (
      <div className="App">
        <br></br>
        <GoogleBtn></GoogleBtn>
        <h1>Finance App</h1>
        <NewEntry></NewEntry>
        <h2>Transactions:</h2>
        {this.state.entries.length === 0 ? <div>No Transactions yet.</div> :
          this.state.entries.map((data, key) => {
            return <Entry key={key} entry={data}></Entry>;
          })
        }

      </div>
    );
  }
}

export default App;