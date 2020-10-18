import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import Logo from './Logo';
import EditCompanyForm from './EditForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CompanyEditView = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
  const { companyUniqeId } = useParams();
  const [companyDetails, setCompaniesDetails] = useState(null);

  const [state, setState] = useState({
    companyLogoURL: null
  });

  const getCompanyById = async (cmpUniqId) => {
    const companyResponse = await axios.get(`http://localhost:4000/company/${cmpUniqId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    setCompaniesDetails(companyResponse.data.companies[0]);
    setState({ companyLogoURL: companyResponse.data.companies[0].companyLogoURL });
  };

  useEffect(() => {
    getCompanyById(companyUniqeId);
  }, [companyUniqeId]);

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

  const editCompany = async (values) => {
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

      console.log('values.....', values);
      const upadteeOrgResponse = await axios.put(`http://localhost:4000/company/${companyUniqeId}`, { ...values, companyLogoURL: state.companyLogoURL }, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('update company Response..', upadteeOrgResponse);
      setShowAlert(true);
      setSeverityValue('success');
      setResponseMessage('Company updated successfully.');
      setState({});
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
            {companyDetails ? (
              <Logo
                uploadcompanylogo={uploadCompanyLogo}
                companyLogoURL={state.companyLogoURL}
              />
            ) : <></>}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {companyDetails ? (
              <EditCompanyForm
                editCompany={editCompany}
                companyDetails={companyDetails}
              />
            ) : <></>}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CompanyEditView;
