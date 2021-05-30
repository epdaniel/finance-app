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

    const toggleEntryModal = () => {
        setShowEntryModal((prev) => !prev);
    };

    return (
        <>
            <Header />
            <button className="addEntryButton" onClick={toggleEntryModal}>
                Add entry
            </button>
            <Modal showModal={showEntryModal} setShowModal={toggleEntryModal}>
                <DetailedEntry toggleModal={toggleEntryModal} />
            </Modal>
            <EntryViewer />
        </>
    );
};

export default withStyles(styles)(Home);
