import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import Entry from "./Entry";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = {};

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
        <Grid container direction="column" justify="center">
            <Grid item>
                <h2>Transactions:</h2>
            </Grid>
            <Grid item>
                {!Array.isArray(entries) || entries.length === 0 ? (
                    <div>No Transactions yet.</div>
                    ) : (
                        entries.map((data, key) => {
                            return <Entry key={key} entry={data}></Entry>;
                        })
                        )}
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(EntryViewer);
