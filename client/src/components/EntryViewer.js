import axios from "axios";
import Modal from "./Modal";
import Entry from "./Entry";
import { useAuth } from "./useAuth";
import DetailedEntry from "./DetailedEntry";
import React, { useState, useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const styles = {
    containerGrid: {
        width: "auto",
    },
};

const EntryViewer = ({ classes }) => {
    const auth = useAuth();
    const [entries, setEntries] = useState([]);
    const [showEntryModal, setShowEntryModal] = useState(false);

    useEffect(() => {
        console.log("Loading entries...");
        if (auth.loggedIn && auth.idToken) {
            axios
                .get("/entries/all", {
                    headers: {
                        Authorization: auth.idToken,
                    },
                })
                .then((res) => setEntries(res.data))
                .catch((e) => {
                    alert("PLACEHOLDER ERROR DISPLAY: " + e.message);
                });
        } else {
            setEntries([]);
        }
    }, [auth]);

    const toggleEntryModal = () => setShowEntryModal((prev) => !prev);

    const addEntryToList = (entry) => {
        setEntries([entry, ...entries]);
    };
    const updateEntry = (index) => {
        return (newEntry) =>
            setEntries([
                ...entries.slice(0, index),
                newEntry,
                ...entries.slice(index + 1),
            ]);
    };

    return (
        <>
            <Modal showModal={showEntryModal} setShowModal={toggleEntryModal}>
                <DetailedEntry
                    toggleModal={toggleEntryModal}
                    addEntryToList={addEntryToList}
                />
            </Modal>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                className={classes.containerGrid}
            >
                <Grid
                    item
                    container
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h4">Transactions</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="add entry"
                            onClick={toggleEntryModal}
                            component="span"
                        >
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
                {!Array.isArray(entries) || entries.length === 0 ? (
                    <div>No Transactions yet.</div>
                ) : (
                    entries.map((data, i) => (
                        <Grid item key={data.id}>
                            <Entry
                                entry={data}
                                updateEntry={updateEntry(i)}
                            ></Entry>
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

export default withStyles(styles)(EntryViewer);
