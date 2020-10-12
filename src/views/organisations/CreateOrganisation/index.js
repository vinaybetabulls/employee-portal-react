import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import Logo from './Logo';
import CreateForm from './CreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CreateOrganization = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    organizationLogoURL: null
  });
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');

  const uploadOrganizationLogo = (evt) => {
    console.log(evt.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = () => {
      setState({ ...state, organizationLogoURL: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const addOrganization = async () => {
    alert('skjdglsdf');
    try {
      state.organizationAddress = [{
        address: state.address,
        city: state.city,
        state: state.state,
        country: state.country,
        zipcode: state.zipcode
      }];
      state.organizationContactPerson = {
        name: state.organizationContactName,
        phone: state.organizationContactPhone
      };
      const createOrgResponse = await axios.post('http://localhost:4000/organization/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create Org Response....', createOrgResponse);
      setShowAlert(true);
      setSeverityValue('success');
      setResponseMessage('Organization created successfully.');
    } catch (error) {
      alert('hi....');
      console.error('org create error....', error.data);
      setSeverityValue('error');
      setShowAlert(true);
      if (error.response.data.statusCode === 409) {
        setResponseMessage('Organization already existed.');
      }
      if (error.response.data.statusCode === 403) {
        setResponseMessage('You don\'t have a permission to create organization.');
      }
      if (error.response.data.statusCode === 400) {
        setResponseMessage('Please enter all mandatory data');
      }
      if (error.response.data.statusCode === 401) {
        setResponseMessage('Authenitcation exception.');
      } else {
        setResponseMessage('Something went wrong. Kindly retry.');
      }
    }
  };

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        {
          showAlert && (
            <Alert
              severity={severityValue}
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            >
              {responseMessage}
              {' '}

            </Alert>
          )
        }
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Logo
              uploadOrganizationLogo={uploadOrganizationLogo}
              organizationLogoURL={state.organizationLogoURL}
            />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <CreateForm handleChange={handleChange} createOrganization={addOrganization} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateOrganization;
