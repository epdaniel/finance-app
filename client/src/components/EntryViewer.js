import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import Entry from "./Entry";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = {
    containerGrid:{
        width: "100%",
    }
};

const EntryViewer = ({ classes }) => {
    const auth = useAuth();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        console.log("Loading entries!");
        if (auth.loggedIn && auth.idToken) {
            axios
                .get("/entries/all", {
                    headers: {
                        id_token: auth.idToken,
                    },
                })
                .then((res) => {
                    console.log(res);
                    let entries = res.data;
                    console.log("got " + entries.length + " entries");
                    setEntries(res.data);
                })
                .catch((e) => {
                    alert("PLACEHOLDER ERROR DISPLAY: " + e.message);
                });
        } else {
            setEntries([]);
        }
    }, [auth]);

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            className={classes.containerGrid}
        >
            <Grid item>
                <Typography variant="h4">Transactions</Typography>
            </Grid>
            {!Array.isArray(entries) || entries.length === 0 ? (
                <div>No Transactions yet.</div>
            ) : (
                entries.map((data, key) => {
                    return (
                        <Grid item key={key}>
                            <Entry entry={data}></Entry>
                        </Grid>
                    );
                })
            )}
        </Grid>
    );
};

export default withStyles(styles)(EntryViewer);
