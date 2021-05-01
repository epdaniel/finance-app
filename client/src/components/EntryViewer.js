import axios from "axios";
import React, { useState, useEffect } from 'react';
import UserProfile from "./userProfile";
import Entry from "./Entry";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = {

};

const EntryViewer = ({ classes }) => {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        console.log("Loading entries!")
        loadAllEntries();
    }, []);

    const loadAllEntries = async () => {
        if (UserProfile.isLoggedIn()) {
            axios.get("/entries/all", {
                headers: {
                    id_token: UserProfile.getId(),
                }
            }).then(res => {
                console.log(res)
                let entries = res.data
                console.log('got ' + entries.length + ' entries')
                setEntries(res.data)
            })
                .catch(e => {
                    alert("PLACEHOLDER ERROR DISPLAY: " + e.message)
                });
        } else {
            setEntries([])
        }
    }

    return (
        <div>
            {(!Array.isArray(entries) || entries.length === 0) ? <div>No Transactions yet.</div> :
                entries.map((data, key) => {
                    return <Entry key={key} entry={data}></Entry>;
                })
            }
        </div>
    )
}

export default withStyles(styles)(EntryViewer);