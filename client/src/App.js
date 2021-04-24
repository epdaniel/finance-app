import React, { useState } from "react";
import "./css/App.css";
import axios from "axios";
import Modal from "./components/Modal";
import GoogleBtn from "./components/GoogleBtn";
import UserProfile from "./components/userProfile";
import DetailedEntry from "./components/DetailedEntry";
import Header from "./components/Header";

function App() {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showLogInError, setLogInError] = useState(false);

  const toggleEntryModal = () => {
    if (UserProfile.isLoggedIn()) setShowEntryModal((prev) => !prev);
    else {
      setLogInError(true);
    }
  };

  // function loadAllEntries() {
  //   let id = UserProfile.getId();
  //   if (id !== -1) {
  //     axios.get('/entries/all', {
  //       headers: {
  //         id: 1  //change to UserProfile.getId();
  //       }
  //     }).then((res) => {
  //       //update entries
  //       //this.setState({ entries: res.data });
  //     });
  //   }
  // }

  //loadAllEntries();

  return (
    <>
      <div className="App">
        <Header logInCallback={() => setLogInError(false)} />
        <button className="addEntryButton" onClick={toggleEntryModal}>
          Add entry
        </button>
        {showLogInError && (
          <p>
            <br />
            Please log in first!
          </p>
        )}
        <Modal showModal={showEntryModal} setShowModal={toggleEntryModal}>
          <DetailedEntry />
        </Modal>
        <h2>Transactions:</h2>
        {/* {(!Array.isArray(this.state.entries) || this.state.entries.length === 0) ? <div>No Transactions yet.</div> :
        this.state.entries.map((data, key) => {
          return <Entry key={key} entry={data}></Entry>;
        })
      } */}
      </div>
    </>
  );
}

export default App;
