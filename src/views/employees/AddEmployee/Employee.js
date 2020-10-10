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
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1100,
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

function getStepContent(step, state, setState, handleChange, profileImageChange) {
  switch (step) {
    case 0:
      return <PersonalDetails state={state} setState={setState} handleChange={handleChange} profileImageChange={profileImageChange} />;
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
    firstName: null,
    lastName: null,
    middleName: null,
    userName: null,
    email: null,
    phone: null,
    isActive: true,
    jobType: null,
    workType: null,
    bloodGroup: null,
    workExperience: {
      years: 0,
      months: 0
    },
    dob: new Date(),
    fathersName: null,
    gender: null,
    motherTounge: null,
    nationality: null,
    maritalStatus: null,
    aadharCardNumber: null,
    panCardNumber: null,
    profileImageURL: '',
    dateOfJoining: '2020-09-26T07:37:51.390Z',
    organization: {
      id: 'string',
      name: 'string'
    },
    company: {
      id: 'string',
      name: 'string'
    },
    designation: {
      id: 'string',
      name: 'string'
    },
    department: {
      id: 'string',
      name: 'string'
    },
    empId: 'string',
    employeeAddress: {
      address: '#123, Building 20, Mindspace',
      city: 'string',
      state: 'string',
      country: 'string',
      zipcode: 'string'
    }
  });

  const handleChange = (evt) => {
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const createEmp = await axios.post('http://localhost:4000/employee/create', state, {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      console.log(createEmp);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const profileImageChange = (evt) => {
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = () => {
      setState({ ...state, profileImageURL: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  return (
    <>
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
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for registering your employee.
                </Typography>
                <Typography variant="subtitle1">
                  Please provide the password to the employee, so that he can login and check/update
                  their profile
                </Typography>
              </>
            ) : (
                // eslint-disable-next-line react/jsx-indent
                <>
                  {getStepContent(activeStep, state, setState, handleChange, profileImageChange)}
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
                </>
                // eslint-disable-next-line indent
              )}
          </>
        </Paper>
      </main>
    </>
  );
}
