import React, { useState } from "react";
import { formatDate } from "../lib/utils";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import DetailedEntry from "./DetailedEntry";

const styles = {
    entryCard: {
        width: "430px",
        minHeight: "70px",
        padding: "15px",
    },
    expense: {
        color: "#c30019",
    },
    income: {
        color: "#006b0c",
    },
    cardContent: {
        padding: "0px",
    },
};

const Entry = ({ classes, entry, updateEntry }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <Card
            className={classes.entryCard}
            elevation={4}
            onClick={toggleExpanded}
        >
            <Collapse in={!expanded} unmountOnExit disableStrictModeCompat>
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
                        <Grid item>
                            <Typography>{entry.category}</Typography>
                        </Grid>
                        <Grid item style={{ color: "grey" }}>
                            {entry.subCategory}
                        </Grid>
                        <Grid item>{formatDate(entry.timestamp)}</Grid>
                    </Grid>
                </Grid>
            </Collapse>
            <Collapse
                in={expanded}
                timeout="auto" //{{ appear: 100, enter: 200, exit: 500 }}
                unmountOnExit
                disableStrictModeCompat
            >
                <CardContent
                    className={classes.cardContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <DetailedEntry
                        entry={entry}
                        toggle={toggleExpanded}
                        setEntry={updateEntry}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default withStyles(styles)(Entry);
