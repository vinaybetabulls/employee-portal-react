import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
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

const CompanyCreateView = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
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

  const createOrganization = async (values) => {
    try {
      values.organizationAddress = [{
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        zipcode: values.zipcode
      }];
      values.organizationContactPerson = {
        name: values.organizationContactName,
        phone: values.organizationContactPhone
      };
      const createOrgResponse = await axios.post('http://localhost:4000/organization/create', { organizationLogoURL: state.organizationLogoURL, ...values }, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create Org Response..', createOrgResponse);
      setShowAlert(true);
      setSeverityValue('success');
      setResponseMessage('Company created successfully.');
      return;
    } catch (error) {
      console.error('org create error..........', Object.entries(error));
      console.error(error);
      setSeverityValue('error');
      setShowAlert(true);
      if ((Object.entries(error)).length === 0) {
        setResponseMessage('Please enter all madatory fields.');
      } else if (error.response && error.response.data.statusCode === 409) {
        setResponseMessage('Company already existed.');
      } else if (error.response && error.response.data.statusCode === 403) {
        setResponseMessage('You don\'t have a permission to create organization.');
      } else if (error.response && error.response.data.statusCode === 400) {
        setResponseMessage('Please enter all mandatory fields');
      } else if (error.response && error.response.data.statusCode === 401) {
        setResponseMessage('Authenitcation exception.');
      } else {
        setResponseMessage('Something went wrong. Kindly retry.');
      }
      // eslint-disable-next-line no-throw-literal
      throw 'error';
    }
  };

  return (
    <Page className={classes.root} title="Organization">
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
            <CreateForm createOrganization={createOrganization} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CompanyCreateView;
