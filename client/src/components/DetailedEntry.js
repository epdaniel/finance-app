import { useForm, Controller } from "react-hook-form";
import React from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
//Date-time picker
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

//TODO: useStyles instead bro
import "../css/DetailedEntry.css";

const defaultValues = {
  desc: "",
  sum: "",
  category: "",
  subcat: "",
  date: new Date(),
};

export const DetailedEntry = () => {
  const { handleSubmit, reset, control } = useForm({ defaultValues });
  const onSubmit = (data) => console.log(data);

  //     addEntry() {
  //         //Save inputs to state
  //         // check all inputs are there
  //         //send inputs using axios
  //         //updated the entries (how to send alert to main app? - maybe take parameters in constructor?)
  //         // axios.post('/entry/new').then((res) => {
  //         //   this.loadAllEntries(); //probably bad, just add entry
  //         // });
  //     }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        className="EntryContainer"
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
        <Grid item xs={3} />
        <Grid item xs={3}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => reset()}
          >
            Clear
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </form>
  );
};
