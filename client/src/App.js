import React, { useState } from "react";
import "./css/App.css";
import Modal from "./components/Modal";
import Header from "./components/Header";
import UserProfile from "./components/userProfile";
import EntryViewer from "./components/EntryViewer";
import DetailedEntry from "./components/DetailedEntry";
import LogIn from "./components/LogIn"

function App() {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showLogInError, setLogInError] = useState(false);

  const toggleEntryModal = () => {
    if (UserProfile.isLoggedIn()) setShowEntryModal((prev) => !prev);
    else {
      setLogInError(true);
    }
  };

  return (
    <>
      <div className="App">
        <LogIn/>
        {/* <Header />
        <button className="addEntryButton" onClick={toggleEntryModal}>
          Add entry
        </button>
        {showLogInError && (
          <p>
            Please log in first!
          </p>
        )}
        <Modal showModal={showEntryModal} setShowModal={toggleEntryModal}>
          <DetailedEntry toggleModal={toggleEntryModal} />
        </Modal>
        <h2>Transactions:</h2>
        <EntryViewer /> */}
      </div>
    </>
  );
}

export default App;
