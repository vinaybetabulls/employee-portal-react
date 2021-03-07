import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from 'react-router-dom';
import Logo from './Logo';
import EditForm from './EditForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OrganizationEditView = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
  const { organizationUniqueId } = useParams();
  const [organizationData, setOrganizationData] = useState(null);
  const [state, setState] = useState({
    organizationLogoURL: null
  });

  const uploadOrganizationLogo = (evt) => {
    console.log(evt.target.files[0]);
    if (evt.target?.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = () => {
        setState({ ...state, organizationLogoURL: reader.result });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  };

  const getOrgnizationById = async (orgUniqId) => {
    const response = await axios.get(`http://localhost:4000/organization/${orgUniqId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    setOrganizationData(response.data.organizations[0]);
    setState({ organizationLogoURL: response.data.organizations[0].organizationLogoURL });
  };
  useEffect(() => {
    getOrgnizationById(organizationUniqueId);
  }, []);

  const editOrganization = async (values) => {
    console.log('edit org values....', values);
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
      const createOrgResponse = await axios.put(`http://localhost:4000/organization/${organizationUniqueId}`, { organizationLogoURL: state.organizationLogoURL, ...values }, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('edit Org Response..', createOrgResponse);
      setShowAlert(true);
      setSeverityValue('success');
      setResponseMessage('Organization edit successfully.');
      return;
    } catch (error) {
      // if ((Object.entries(error)).length === 0) {
      //   setResponseMessage('Please enter all madatory fields.');
      // } else 
      if (error.response && error.response.data.statusCode === 409) {
        setSeverityValue('error');
        setShowAlert(true);
        setResponseMessage('Company already existed.');
      } else if (error.response && error.response.data.statusCode === 403) {
        setSeverityValue('error');
        setShowAlert(true);
        setResponseMessage('You don\'t have a permission to create organization.');
      } else if (error.response && error.response.data.statusCode === 400) {
        setSeverityValue('error');
        setShowAlert(true);
        setResponseMessage('Please enter all mandatory fields');
      } else if (error.response && error.response.data.statusCode === 401) {
        setSeverityValue('error');
        setShowAlert(true);
        setResponseMessage('Authenitcation exception.');
      } else if (error.response && error.response.data.statusCode === 500) {
        setSeverityValue('error');
        setShowAlert(true);
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
          {organizationData ? (
            <>
              <Grid item lg={4} md={6} xs={12}>
                <Logo
                  uploadOrganizationLogo={uploadOrganizationLogo}
                  organizationLogoURL={state.organizationLogoURL}
                />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <EditForm editOrganization={editOrganization} organizationData={organizationData} />
              </Grid>
            </>
          ) : null}

        </Grid>
      </Container>
    </Page>
  );
};

export default OrganizationEditView;
