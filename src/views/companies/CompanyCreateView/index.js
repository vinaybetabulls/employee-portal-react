import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import Logo from './Logo';
import CreateForm from './CreateForm';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

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

  const createCompany = async () => {
    try {
      state.companyAddress = [{
        address: state.address,
        city: state.city,
        state: state.state,
        country: state.country,
        zipcode: state.zipcode
      }];
      state.companyContactPerson = {
        name: state.companyContactName,
        phone: state.companyContactPhone
      };
      const createOrgResponse = await axios.post('http://localhost:4000/company/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create company Response..', createOrgResponse);
      setShowAlert(true); setState({});
    } catch (error) {
      console.log('org create error', error);
    };
  };

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        {
          showAlert && <Alert severity="success" action={
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
          }>
            Company added successfully! </Alert>
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
