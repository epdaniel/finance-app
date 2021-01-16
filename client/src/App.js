import React, { useState } from 'react';
import './App.css';
import axios from 'axios'
import Entry from './Entry';
import NewEntry from './NewEntry';
import GoogleBtn from './GoogleBtn';
import UserProfile from './userProfile';


function App(props) {
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);


  function loadAllEntries() {
    let id = UserProfile.getId();
    if (id !== -1) {
      axios.get('/entries/all', {
        headers: {
          id: 1  //change to UserProfile.getId();
        }
      }).then((res) => {
        this.setState({ entries: res.data });
      });
    }
  }

  loadAllEntries();


  return (
    <div className="App">
      <br></br>
      <GoogleBtn></GoogleBtn>
      <h1>Finance App</h1>
      <button class="addEntryButton">Add entry</button>
      <h2>Transactions:</h2>
      {/* {(!Array.isArray(this.state.entries) || this.state.entries.length === 0) ? <div>No Transactions yet.</div> :
        this.state.entries.map((data, key) => {
          return <Entry key={key} entry={data}></Entry>;
        })
      } */}

    </div>
  );
}

export default App;