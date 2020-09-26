import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import Review from './Review';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Personal Details', 'Working Details'];

function getStepContent(step, state, setState, handleChange) {
  switch (step) {
    case 0:
      return <PersonalDetails state={state} setState={setState} handleChange={handleChange} />;
    case 1:
      return <WorkExperience state={state} setState={setState} handleChange={handleChange} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Employee() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = useState({
    "firstName": null,
    "lastName": null,
    "middleName": null,
    "userName": null,
    "email": null,
    "phone": null,
    "isActive": true,
    "jobType": null,
    "workType": null,
    "bloodGroup": null,
    "workExperience": {
      "years": 0,
      "months": 0
    },
    "dob": new Date(),
    "fathersName": null,
    "gender": null,
    "motherTounge": null,
    "nationality": null,
    "maritalStatus": null,
    "aadharCardNumber": null,
    "panCardNumber": null,
    "profileImageURL": null,
    "dateOfJoining": "2020-09-26T07:37:51.390Z",
    "organization": {
      "id": "string",
      "name": "string"
    },
    "company": {
      "id": "string",
      "name": "string"
    },
    "designation": {
      "id": "string",
      "name": "string"
    },
    "department": {
      "id": "string",
      "name": "string"
    },
    "empId": "string",
    "employeeAddress": {
      "address": "#123, Building 20, Mindspace",
      "city": "string",
      "state": "string",
      "country": "string",
      "zipcode": "string"
    }
  })

  const handleChange = (evt) => {
    setState({ ...state, [evt.target.name]: evt.target.value })
  }

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const createEmp = await axios.post('http://localhost:4000/employee/create', state, {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoic3VwZXJhZG1pbiIsInJvbGVzIjpbIlNVUEVSX0FETUlOIl0sInBlcm1pc3Npb25zIjpbIkFERElUSU9OQUwiLCJDUkVBVEUiLCJERUxFVEUiLCJFRElUIiwiVklFVyJdLCJlbXBVbmlxdWVJZCI6IjQzYzRlN2Y1LTBlMGItNDY2OS1hNzFmLTk5NTJlODY1ZmQ2YyIsImlzRmlyc3RUaW1lTG9naW4iOmZhbHNlfSwiaWF0IjoxNjAxMTUyMjEzLCJleHAiOjE2MDEyMzg2MTN9.vE7eFMxuIOKqkktOHzyDKk7XOyrVyw95o3ZRu3lob54"
        }
      });
      console.log(createEmp);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Create Employee
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Fill Employee Details
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for registering your employee.
                </Typography>
                <Typography variant="subtitle1">
                  Please provide the password to the employee, so that he can login and check/update their profile
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep, state, setState, handleChange)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
