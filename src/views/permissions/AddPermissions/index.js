import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import CreateForm from './CreateForm';
import Toolbar from './Toolbar';
import debounce from 'lodash.debounce';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PermissionsCreateView = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    organizationLogoURL: null
  });



  async function onChange(value) {
    console.log('onchage...,', value);
    const employees = await axios.get(`http://localhost:4000/employee/employee/search/${value}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
  }

  const debounceOnChange = React.useCallback(debounce(onChange, 400), []);

  const uploadOrganizationLogo = (evt) => {
    console.log(evt.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = function () {
      setState({ ...state, organizationLogoURL: reader.result });
    };
    reader.onerror = function (error) {
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
    } catch (error) {
      console.log('org create error', error);
    }
  };

  /**
   * search employees
   */

  const searchEmployees = (event) => {
    console.log('seach employee', event.target.value);
  };
  return (
    <Page className={classes.root} title="Permission">

      <Container maxWidth={false}>
        <Toolbar debounceOnChange={debounceOnChange} placeholder="Search Employee" />
        <Grid container>
          <Grid item lg={12} md={12} xs={12}>
            <CreateForm handleChange={handleChange} createOrganization={createOrganization} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PermissionsCreateView;
