import React from 'react'
import GoogleBtn from "./GoogleBtn";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField, Typography, Button, FormControl, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        margin: '0px',
        backgroundColor: "#37474F",
        paddingTop: '5%',
    },
    subtitle: {
        color: "#CFD8DC",
    },
    title: {
        color: "#ffffff",
        fontFamily: "'Playfair Display', serif",
    },
    buttonGrid:{
        marginTop: '40px',
    }
  };

  
const LogIn = ({ classes }) => {
    return (
        <Grid container spacing={1} className={classes.container} direction="column" alignItems="center">
           <Grid item>
                <img width="120" src="moneyicon.svg"></img>   
            </Grid> 
            <Grid item>
                <Typography variant="h2" className={classes.title}>FinanceApp</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" className={classes.subtitle}>A simple way to keep track of your funds</Typography>
            </Grid>
            <Grid item className={classes.buttonGrid}>
                <GoogleBtn/>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(LogIn);
