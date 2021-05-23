import React , { useState } from 'react'
import Modal from "./Modal";
import Header from "./Header";
import UserProfile from "./userProfile";
import EntryViewer from "./EntryViewer";
import DetailedEntry from "./DetailedEntry";
import { withStyles } from "@material-ui/core/styles";


const styles = {

  };

const Home = () => {
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
        <Header />
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
        <EntryViewer />
        </>
    )
}

export default withStyles(styles)(Home);
