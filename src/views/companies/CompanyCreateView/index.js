import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from './Logo';
import CreateForm from './CreateForm';
import axios from 'axios';

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

  const [state, setState] = useState({
    companyLogoURL: null
  })

  const uploadCompanyLogo = (evt) => {
    console.log(evt.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = function () {
      setState({ ...state, companyLogoURL: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleChange = (event) => {
    console.log('event.', event.target.value)
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
      }]
      state.companyContactPerson = {
        name: state.companyContactName,
        phone: state.companyContactPhone
      }
      const createOrgResponse = await axios.post('http://localhost:4000/company/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create company Response..', state)
    } catch (error) {
      console.log('org create error', error)
    }
  }

  return (
    <Page className={classes.root} title="Account" >
      <Container maxWidth="lg">
        <Grid container spacing={3} >
          <Grid item lg={4} md={6} xs={12} >
            <Logo uploadcompanylogo={uploadCompanyLogo} companyLogoURL={state.companyLogoURL} />
          </Grid>
          <Grid item lg={8} md={6} xs={12} >
            <CreateForm handleChange={handleChange} createCompany={createCompany} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CustomerCreateView;
