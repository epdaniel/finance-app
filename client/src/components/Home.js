import React from "react";
import Header from "./Header";
import EntryViewer from "./EntryViewer";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

const Home = () => {
    return (
        <>
            <Header />
            <EntryViewer />
        </>
    );
};

export default withStyles(styles)(Home);
