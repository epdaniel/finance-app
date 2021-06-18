import React from "react";
import { formatDate } from "../lib/utils";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const styles = {
    entryPaper: {
        width: "420px",
        height: "70px",
        padding: "15px",
    },
    expense: {
        color: "#c30019",
    },
    income: {
        color: "#006b0c",
    },
};

const Entry = ({ classes, entry }) => {
    return (
        <Paper className={classes.entryPaper} elevation={4}>
            <Grid container spacing={2}>
                <Grid item container xs={12} justify="space-between">
                    <Grid item>
                        <Typography variant="h5">
                            {entry.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h6"
                            className={
                                entry.isExpense
                                    ? classes.expense
                                    : classes.income
                            }
                        >
                            {entry.isExpense ? "-" : "+"}
                            {entry.amount}₪
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} justify="space-between">
                    <Grid item>{entry.category}</Grid>
                    <Grid item>{entry.subCategory}</Grid>
                    <Grid item>{formatDate(entry.timestamp)}</Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(Entry);
