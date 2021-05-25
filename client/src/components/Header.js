import React from "react";
import GoogleBtn from "./GoogleBtn";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = {
    HeaderContainer: {
        width: "100%",
        margin: 0,
        padding: 4,
        backgroundColor: "#37474F",
    },
    header: {
        fontFamily: "'Playfair Display', serif",
        color: "#ffffff",
        paddingBottom: "3%",
        paddingLeft: "10px",
    },
};

const Header = ({ classes }) => {
    return (
        <Grid
            container
            className={classes.HeaderContainer}
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h4" className={classes.header}>
                    Finance App
                </Typography>
            </Grid>
            <Grid item>
                <GoogleBtn></GoogleBtn>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(Header);
