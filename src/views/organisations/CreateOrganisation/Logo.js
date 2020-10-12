import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  input: {
    display: 'none',
  },
}));

const Logo = ({
  organizationLogoURL, uploadOrganizationLogo, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={organizationLogoURL}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Formik
          initialValues={{
            organizationLogoURL: ''
          }}
          validationSchema={Yup.object().shape({
            organizationLogoURL: Yup.string().max(255).required('Logo is required')
          })}
        >
          {({
            errors,
            handleBlur,
            touched,
          }) => (
              // eslint-disable-next-line react/jsx-indent
              <form>
                <input
                  error={Boolean(touched.organizationLogoURL && errors.organizationLogoURL)}
                  helperText={touched.organizationLogoURL && errors.organizationLogoURL}
                  accept="image/*"
                  className={classes.input}
                  name="file"
                  id="contained-button-file"
                  type="file"
                  onBlur={handleBlur}
                  onChange={uploadOrganizationLogo}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">  Logo </Button>
                </label>
              </form>
              // eslint-disable-next-line indent
            )}
        </Formik>
      </CardActions>
    </Card>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  organizationLogoURL: PropTypes.string,
  uploadOrganizationLogo: PropTypes.func
};

export default Logo;
