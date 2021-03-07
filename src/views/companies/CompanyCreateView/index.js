import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
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

const CustomerCreateView = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');

  const [state, setState] = useState({
    companyLogoURL: null
  });

  const uploadCompanyLogo = (evt) => {
    console.log(evt.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = () => {
      setState({ ...state, companyLogoURL: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const handleChange = (event) => {
    console.log('event.', event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const createCompany = async (values) => {
    console.log('values.....', values);
    try {
      values.companyAddress = [{
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        zipcode: values.zipcode
      }];
      values.companyContactPerson = {
        name: values.companyContactName,
        phone: values.companyContactPhone
      };
      const createOrgResponse = await axios.post('http://localhost:4000/company/create', { ...values, companyLogoURL: state.companyLogoURL }, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create company Response..', createOrgResponse);
      setShowAlert(true);
      setSeverityValue('success');
      setResponseMessage('Company created successfully.');
      setState({
        companyLogoURL: null
      });
      return;
    } catch (error) {
      console.error('company create error.....', error.response.data.statusCode === 400);
      setSeverityValue('error');
      setShowAlert(true);
      if (error.response.data.statusCode === 409) {
        setResponseMessage('Company already existed.');
      } else if (error.response.data.statusCode === 403) {
        setResponseMessage('You don\'t have a permission to create organization.');
      } else if (error.response.data.statusCode === 400) {
        setResponseMessage('Please enter all mandatory fields');
      } else if (error.response.data.statusCode === 401) {
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
            <Logo uploadcompanylogo={uploadCompanyLogo} companyLogoURL={state.companyLogoURL} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <CreateForm handleChange={handleChange} createCompany={createCompany} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CustomerCreateView;
