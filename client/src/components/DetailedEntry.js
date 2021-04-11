import axios from "axios";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
//DateTime picker
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const styles = {
  EntryContainer: {
    width: "100%",
    margin: 0,
  },
  modalButton: {
    marginLeft: "10px",
    marginRight: "10px",
  },
};

const defaultValues = {
  desc: "",
  sum: "",
  category: "",
  subcat: "",
  date: new Date(),
};

const DetailedEntry = (props) => {
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const onSubmit = (data) => {
    console.log(data);
    data["isExpense"] = true;
    //updated the entries (how to send alert to main app? - maybe take parameters in constructor?)
    axios
      .post("/entries/add", {
        ...data,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        className={props.classes.EntryContainer}
        spacing={8}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12}>
          <Typography variant="h4">Add Transaction</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="desc"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label="Description"
                onChange={onChange}
                defaultValue={value}
                inputRef={ref}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="sum"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label="Sum"
                onChange={onChange}
                value={value}
                inputRef={ref}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label="Category"
                onChange={onChange}
                value={value}
                inputRef={ref}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="subcat"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label="Sub-Category"
                onChange={onChange}
                value={value}
                inputRef={ref}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
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
        <Grid item xs={12}>
          <Button
            className={props.classes.modalButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Expense
          </Button>
          <Button
            className={props.classes.modalButton}
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => reset()}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(DetailedEntry);
