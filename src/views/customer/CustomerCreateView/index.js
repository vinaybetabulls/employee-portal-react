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

const CompanyCreateView = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [state, setState] = useState({
    organizationLogoURL: null
  });

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

  const createOrganization = async () => {
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
      console.log('create Org Response..', createOrgResponse);
      setShowAlert(true); setState({})
    } catch (error) {
      console.log('org create error', error);
    }
  };

  return (
    <Page className={classes.root} title="Organization">
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
            Organisation added successfully! </Alert>
        }
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Logo uploadOrganizationLogo={uploadOrganizationLogo} organizationLogoURL={state.organizationLogoURL} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <CreateForm handleChange={handleChange} createOrganization={createOrganization} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CompanyCreateView;
