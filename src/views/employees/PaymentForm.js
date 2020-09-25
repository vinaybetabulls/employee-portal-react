import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  formControlsize: { minWidth: 120 },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaymentForm() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Working Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Job Type</InputLabel>
            <Select native name="jobType">
              <option aria-label="None" value="" />
              <option value="contractor">Contractor</option>
              <option value="permenent">Permenent</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Work Type</InputLabel>
            <Select native name="workType">
              <option aria-label="None" value="" />
              <option value="fullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="freelance">Freelance</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControlsize}>
            <InputLabel htmlFor="age-native-simple">Years</InputLabel>
            <Select native name="workExperience">
              <option aria-label="None" value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </FormControl>{"   "}
          <FormControl className={classes.formControlsize}>
            <InputLabel htmlFor="age-native-simple">Months</InputLabel>
            <Select native name="workExperience">
              <option aria-label="None" value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Organization</InputLabel>
            <Select native name="jobType">
              <option aria-label="None" value="" />
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Company</InputLabel>
            <Select native name="workType">
              <option aria-label="None" value="" />
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Designation</InputLabel>
            <Select native name="jobType">
              <option aria-label="None" value="" />
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Department</InputLabel>
            <Select native name="workType">
              <option aria-label="None" value="" />
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="empId"
            label="EmpID"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}