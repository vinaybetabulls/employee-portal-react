/* eslint-disable react/prop-types */
import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PersonalDetails({ state, setState, handleChange }) {
  const classes = useStyles();
  const handleEmpAdd = (event) => {
    const { employeeAddress: ea } = state;
    const employeeAddress = { ...ea, [event.target.name]: event.target.value };
    setState({
      ...state, employeeAddress
    });
    // setState({ ...state, ...employeeAddress[0], [event.target.name]: event.target.value})
  };
  return (
    <>
      <Typography variant="h6" gutterBottom />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={state.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="middleName"
            name="middleName"
            label="Middle name"
            fullWidth
            autoComplete="given-name"
            value={state.middleName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={state.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="fathersName"
            name="fathersName"
            label="Father Name"
            fullWidth
            autoComplete="family-name"
            value={state.fatherName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="userName"
            name="userName"
            label="UserName"
            fullWidth
            autoComplete="family-name"
            value={state.userName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="family-name"
            value={state.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="family-name"
            value={state.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
            <Select native name="gender" value={state.gender} onChange={handleChange}>
              <option aria-label="None" value="" />
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="bloodGroup"
            name="bloodGroup"
            label="Blood Group"
            fullWidth
            autoComplete="given-name"
            value={state.bloodGroup}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="maritalStatus"
            name="maritalStatus"
            label="Marital Status"
            fullWidth
            autoComplete="given-name"
            value={state.maritalStatus}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              name="dob"
              value={state.dob}
              onChange={handleChange}
              style={{ margin: 0, width: '100%' }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </Grid> */}
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="aadharCardNumber"
            name="aadharCardNumber"
            label="Aadhar Card"
            fullWidth
            autoComplete="given-name"
            value={state.aadharCardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="panCardNumber"
            name="panCardNumber"
            label="Pan Card"
            fullWidth
            autoComplete="given-name"
            value={state.panCardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="motherTounge"
            name="motherTounge"
            label="Mother Tounge"
            fullWidth
            autoComplete="shipping address-line1"
            value={state.motherTounge}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="nationality"
            name="nationality"
            label="Nationality"
            fullWidth
            autoComplete="shipping address-line1"
            value={state.nationality}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={handleEmpAdd}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleEmpAdd}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={handleEmpAdd} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            onChange={handleEmpAdd}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="zipcode"
            name="zipcode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={handleEmpAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="isActive" value="yes" />}
            label="Active Employee"
            checked={state.isActive}
          />
        </Grid>
      </Grid>
    </>
  );
}
