import React from 'react'
import GoogleBtn from "./GoogleBtn";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = {
    HeaderContainer: {
        width: "100%",
        margin: 0,
        padding: 6,
        marginBottom: 10,
        backgroundColor: 'salmon',
    },
    modalButton: {
        marginLeft: "10px",
        marginRight: "10px",
    },
};

const Header = ({ classes, logInCallback }) => {
    return (
        <Grid
            container
            className={classes.HeaderContainer}
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h4">Finance App</Typography>
            </Grid>
            <Grid item>
                <GoogleBtn logInCallback={logInCallback}></GoogleBtn>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Header);