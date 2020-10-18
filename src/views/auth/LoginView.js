import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import { AppContext } from 'src/context/AppContext';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setIsAuthenticated, setMenuList } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    setMenuList([]);
    setIsAuthenticated(false);
  }, []);
  return (

    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              try {
                const emp = await axios.post('http://localhost:4000/employee/login', { username: values.email, password: values.password });
                const { jwt, isFirstTimeLogin, companyLogoURL } = emp.data;
                localStorage.setItem('empJWT', jwt);
                if (companyLogoURL) {
                  localStorage.setItem('companyLogoURL', companyLogoURL?.companyLogoURL);
                }
                if (jwt) setIsAuthenticated(true);
                if (!isFirstTimeLogin) {
                  navigate('app/organizaiton/view');
                } else {
                  navigate('changepassowrd');
                }
              } catch (error) {
                console.debug(error.response);
                console.error('status code', error.response.data.statusCode);
                setShowAlert(true);
                setSeverityValue('error');
                if (error.response.data.statusCode === 404) {
                  setResponseMessage('Please enter valid employee details.');
                } else {
                  setResponseMessage('Something went wrong. Kindly retry.');
                }
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
                // eslint-disable-next-line react/jsx-indent
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Sign in
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Sign in to the employee portal
                    </Typography>
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
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="EmpId / Username/ Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                </form>
                // eslint-disable-next-line indent
              )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
