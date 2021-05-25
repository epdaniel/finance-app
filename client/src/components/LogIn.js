import React from "react";
import GoogleBtn from "./GoogleBtn";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useAuth } from "./useAuth";
import { Redirect } from "react-router-dom";

const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        margin: "0px",
        backgroundColor: "#37474F",
        paddingTop: "6%",
    },
    subtitle: {
        color: "#CFD8DC",
    },
    title: {
        color: "#ffffff",
        fontFamily: "'Playfair Display', serif",
    },
    buttonGrid: {
        marginTop: "40px",
    },
};

const LogIn = ({ classes }) => {
    return (
        <Grid
            container
            spacing={1}
            className={classes.container}
            direction="column"
            alignItems="center"
        >
            <Grid item>
                <img src="moneyicon.svg" width="120" alt="logo" />
            </Grid>
            <Grid item>
                <Typography variant="h2" className={classes.title}>
                    FinanceApp
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" className={classes.subtitle}>
                    A simple way to keep track of your funds
                </Typography>
            </Grid>
            <Grid item className={classes.buttonGrid}>
                <GoogleBtn />
            </Grid>
        </Grid>
    );
};

const LogInWrapper = ({ classes }) => {
    const auth = useAuth();

    return (
        <>{auth.loggedIn ? <Redirect to="/" /> : <LogIn classes={classes} />}</>
    );
};

export default withStyles(styles)(LogInWrapper);
