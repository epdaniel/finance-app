import React from "react";
import Header from "./Header";
import EntryViewer from "./EntryViewer";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {};

const Home = () => {
    return (
        <>
            <Header />
            <Grid container alignItems="center" justify="center">
                <Grid item>
                    <EntryViewer />
                </Grid>
            </Grid>
        </>
    );
};

export default withStyles(styles)(Home);
