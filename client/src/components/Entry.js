import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const styles = {
    entryPaper: {
        width: "400px",
        height: "120px",
        padding: "10px",
    },
};

const Entry = ({ classes, entry }) => {
    console.log(entry);
    return (
        <Paper className={classes.entryPaper} elevation={2}>
            <Grid container spacing={1}>
                <Grid item container xs={12} justify="space-between">
                    <Grid item>{entry.description}</Grid>
                    <Grid item>{entry.amount}₪</Grid>
                </Grid>
                <Grid item xs={12}>
                    Category: {entry.category}
                </Grid>
                <Grid item xs={12}>
                    Sub-category: {entry.subCategory}
                </Grid>
                <Grid item xs={12}>
                    Date: {entry.timestamp}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(Entry);
