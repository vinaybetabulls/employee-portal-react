import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { AppContext } from 'src/context/AppContext';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  console.log(process.env);
  const classes = useStyles();
  const navigate = useNavigate();
  const { setIsAuthenticated, setMenuList } = useContext(AppContext);

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
                console.log(emp.data);
                const { jwt, isFirstTimeLogin, companyLogoURL } = emp.data;
                localStorage.setItem('empJWT', jwt);
                localStorage.setItem('companyLogoURL', companyLogoURL?.companyLogoURL);
                jwt && setIsAuthenticated(true);
                if (!isFirstTimeLogin) {
                  navigate('app/dashboard');
                }
                else {
                  navigate('changepassowrd');
                }
                localStorage.setItem('empJWT', jwt);
              } catch (error) {
                console.log(error);
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
                  </Box>
                  {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid> */}
                  {/* <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                  </Typography>
                  </Box> */}
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
                  {/* <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Sign up
                  </Link>
                  </Typography> */}
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
