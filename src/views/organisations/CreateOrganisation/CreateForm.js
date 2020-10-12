import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CreateForm = ({
  createOrganization, handleChange, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        organizationName: '',
        organizationCode: '',
        organizationEmail: '',
        organizationPhone: '',
        organizationContactPhone: '',
        organizationContactName: '',
        address: '',
        city: '',
        country: '',
        zip: ''
      }}
      validationSchema={Yup.object().shape({
        organizationName: Yup.string().max(255).required('Email is required'),
        organizationCode: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values) => {
      }}
    >
      {({
        errors,
        handleBlur,
        isSubmitting,
        touched,
        values
      }) => (
          // eslint-disable-next-line react/jsx-indent
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Card>
              <CardHeader
                title="Create Organizaton"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.organizationName && errors.organizationName)}
                      helperText={touched.organizationName && errors.organizationName}
                      fullWidth
                      label="Organization name"
                      name="organizationName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.organizationName}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.organizationCode && errors.organizationCode)}
                      helperText={touched.organizationCode && errors.organizationCode}
                      fullWidth
                      label="Organization code"
                      name="organizationCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.organizationCode}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.organizationEmail && errors.organizationEmail)}
                      helperText={touched.organizationEmail && errors.organizationEmail}
                      fullWidth
                      label="Organization Email"
                      name="organizationEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.organizationEmail}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.organizationPhone && errors.organizationPhone)}
                      helperText={touched.organizationPhone && errors.organizationPhone}
                      fullWidth
                      label="Organization Phone"
                      name="organizationPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      variant="outlined"
                      value={values.organizationPhone}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      // eslint-disable-next-line max-len
                      error={Boolean(touched.organizationContactName && errors.organizationContactName)}
                      helperText={touched.organizationContactName && errors.organizationContactName}
                      fullWidth
                      label="Organization Contact Name"
                      name="organizationContactName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      variant="outlined"
                      value={values.organizationContactName}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      // eslint-disable-next-line max-len
                      error={Boolean(touched.organizationContactPhone && errors.organizationContactPhone)}
                      helperText={touched.organizationContactPhone && errors.organizationContactPhone}
                      fullWidth
                      label="Organization Contact Phone"
                      name="organizationContactPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      variant="outlined"
                      value={values.organizationContactPhone}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.address}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      fullWidth
                      label="City"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.city}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                      fullWidth
                      label="State"
                      name="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.state}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.country && errors.country}
                      fullWidth
                      label="Country"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.country}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.zip && errors.zip)}
                      helperText={touched.zip && errors.zip}
                      fullWidth
                      label="Zip"
                      name="zipcode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.zip}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="button"
                  onClick={createOrganization}
                  disabled={isSubmitting}
                >
                  Create organization
                </Button>
              </Box>
            </Card>
          </form>
          // eslint-disable-next-line indent
        )}
    </Formik>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string,
  createOrganization: PropTypes.func,
  handleChange: PropTypes.func
};

export default CreateForm;
