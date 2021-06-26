import axios from "axios";
import React from "react";
import { useAuth } from "./useAuth";
import { MdClose } from "react-icons/md";
import { withStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import {
    Grid,
    TextField,
    Typography,
    Button,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    IconButton,
} from "@material-ui/core";
//DateTime picker
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const styles = {
    EntryContainer: {
        width: "100%",
        margin: 0,
        textAlign: "center",
        paddingBottom: "0px",
    },
    modalButton: {
        marginLeft: "10px",
        marginRight: "10px",
    },
    radio: {
        color: "#37474F",
        "&$checked": {
            color: "#37474F",
        },
    },
};

let defaultValues = {
    description: "",
    amount: "",
    category: "",
    subCategory: "",
    timestamp: new Date(),
    isExpense: "expense",
};

const DetailedEntry = ({
    classes,
    toggleModal,
    addEntryToList,
    entry,
    toggle,
}) => {
    const auth = useAuth();
    if (entry) {
        defaultValues = {
            ...entry,
            isExpense: entry["isExpense"] ? "expense" : "income",
        };
    }
    const { handleSubmit, reset, control } = useForm({ defaultValues });
    const onSubmit = async (data) => {
        data["isExpense"] = data["isExpense"] === "expense";
        const response = await axios
            .post("/entries/add", data, {
                headers: {
                    Authorization: auth.idToken,
                },
            })
            .catch((e) => {
                alert("PLACEHOLDER ERROR DISPLAY: " + e.response.data.message);
                return;
            });
        if (!entry) {
            addEntryToList(response.data);
            reset();
            toggleModal();
        } else {
            toggle();
            //update entry
        }
    };

    const entryToggleHandler = (e) => {
        console.log("handler!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
                container
                className={classes.EntryContainer}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid
                    container
                    item
                    xs={12}
                    justify="space-between"
                    alignItems="center"
                    style={{ paddingTop: "0px" }}
                >
                    <Grid item>
                        <Typography variant="h5" onClick={toggle}>
                            {entry ? "Edit Transaction" : "Add Transaction"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="close"
                            onClick={toggle}
                            component="span"
                        >
                            <MdClose
                                className={classes.closeButton}
                                aria-label="Close"
                            ></MdClose>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField label="Description" {...field} />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <TextField label="Sum" type="number" {...field} />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <TextField label="Category" {...field} />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="subCategory"
                        control={control}
                        render={({ field }) => (
                            <TextField label="Sub-Category" {...field} />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="timestamp"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    label="Date"
                                    value={value}
                                    onChange={onChange}
                                />
                            </MuiPickersUtilsProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="isExpense"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                component="fieldset"
                                onChange={entryToggleHandler}
                            >
                                <RadioGroup
                                    aria-label="entryType"
                                    name="entryType1"
                                    {...field}
                                >
                                    <FormControlLabel
                                        value="expense"
                                        control={
                                            <Radio
                                                color="custom"
                                                className={classes.radio}
                                            />
                                        }
                                        label="Expense"
                                    />
                                    <FormControlLabel
                                        value="income"
                                        control={
                                            <Radio
                                                color="custom"
                                                className={classes.radio}
                                            />
                                        }
                                        label="Income"
                                    />
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: "0px" }}>
                    <Button
                        className={classes.modalButton}
                        type="submit"
                        variant="contained"
                        color="custom"
                        style={{ backgroundColor: "#37474F", color: "white" }}
                    >
                        {entry ? "Save" : "Add Transaction"}
                    </Button>
                    {entry ? null : (
                        <Button
                            className={classes.modalButton}
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => reset()}
                        >
                            Clear
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default withStyles(styles)(DetailedEntry);
