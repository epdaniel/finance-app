import axios from "axios";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Typography, Button, FormControl, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
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
  isExpense: "expense",
};

const DetailedEntry = ({ classes }) => {
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const onSubmit = async (data) => {
    data['isExpense'] = data['isExpense'] === 'expense'
    console.log(data);
    //updated the entries (how to send alert to main app? - maybe take parameters in constructor?)
    let res = await axios.post("/entries/add", data)
      .catch(e => {
        alert("PLACEHOLDER ERROR DISPLAY: " + e.response.data.message)
      });
    console.log(res)
  };

  const entryToggleHandler = (e) => {
    console.log("handler!")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        className={classes.EntryContainer}
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
            render={({ field }) => (
              <TextField
                label="Description"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="sum"
            control={control}
            render={({ field }) => (
              <TextField
                label="Sum"
                type="number"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                label="Category"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="subcat"
            control={control}
            render={({ field }) => (
              <TextField
                label="Sub-Category"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="date"
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
        <Grid item xs={12} sm={6}>
          <Controller
            name="isExpense"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" onChange={entryToggleHandler}>
                <RadioGroup aria-label="entryType" name="entryType1" {...field}>
                  <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                  <FormControlLabel value="income" control={<Radio />} label="Income" />
                </RadioGroup>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.modalButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Transaction
          </Button>
          <Button
            className={classes.modalButton}
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
