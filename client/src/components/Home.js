import React, { useState } from "react";
import Modal from "./Modal";
import Header from "./Header";
import { useAuth } from "./useAuth";
import EntryViewer from "./EntryViewer";
import DetailedEntry from "./DetailedEntry";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

const Home = () => {
    const auth = useAuth();
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [showLogInError, setLogInError] = useState(false);

    const toggleEntryModal = () => {
        if (auth.loggedIn) setShowEntryModal((prev) => !prev);
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
            {showLogInError && <p>Please log in first!</p>}
            <Modal showModal={showEntryModal} setShowModal={toggleEntryModal}>
                <DetailedEntry toggleModal={toggleEntryModal} />
            </Modal>
            <EntryViewer />
        </>
    );
};

export default withStyles(styles)(Home);
