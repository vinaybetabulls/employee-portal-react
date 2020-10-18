import React from 'react';
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

const EditForm = ({
  editOrganization, organizationData, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        organizationName: organizationData.organizationName || '',
        organizationCode: organizationData.organizationCode || '',
        organizationEmail: organizationData.organizationEmail || '',
        organizationPhone: organizationData.organizationPhone || '',
        organizationContactPhone: organizationData.organizationContactPerson.phone || '',
        organizationContactName: organizationData.organizationContactPerson.name || '',
        address: organizationData.organizationAddress[0].address || '',
        city: organizationData.organizationAddress[0].city || '',
        country: organizationData.organizationAddress[0].country || '',
        zipcode: organizationData.organizationAddress[0].zipcode || '',
        state: organizationData.organizationAddress[0].state || ''
      }}
      validationSchema={Yup.object().shape({
        organizationName: Yup.string().max(255).required('Organization name is required'),
        organizationCode: Yup.string().max(255).required('Organization code is required'),
        organizationEmail: Yup.string().email('Invalid email').max(255).required('Organization email is required'),
        organizationPhone: Yup.string().max(255).required('Organization phone is required'),
        organizationContactPhone: Yup.string().max(255).required('Organization contact person phone is required'),
        organizationContactName: Yup.string().max(255).required('Organization contact person name is required'),
        address: Yup.string().max(255).required('Organization address is required'),
        city: Yup.string().max(255).required('Organization city is required'),
        state: Yup.string().max(255).required('Organization state is required'),
        country: Yup.string().max(255).required('Organization country is required'),
        zipcode: Yup.string().max(255).required('Organization zipcode is required')
      })}
      onSubmit={async (values, { resetForm }) => {
        console.log('on submit values....', values);
        try {
          await editOrganization(values);
          // resetForm();
        } catch (e) {
          console.log('formik error..', e);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        isValid,
        handleSubmit,
        handleChange,
        touched,
        values
      }) => (
          // eslint-disable-next-line react/jsx-indent
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <Card>
              <CardHeader
                title="Update Organizaton"
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
                      disabled
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
                      disabled
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
                      type="email"
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
                      type="text"
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
                      // eslint-disable-next-line max-len
                      helperText={touched.organizationContactName && errors.organizationContactPhone}
                      fullWidth
                      label="Organization Contact Phone"
                      name="organizationContactPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
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
                      error={Boolean(touched.zipcode && errors.zipcode)}
                      helperText={touched.zipcode && errors.zipcode}
                      fullWidth
                      label="Zip"
                      name="zipcode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.zipcode}
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
                  type="submit"
                  disabled={!isValid}
                  onClick={editOrganization}
                >
                  Update organization
                </Button>
              </Box>
            </Card>
          </form>
          // eslint-disable-next-line indent
        )}
    </Formik>
  );
};

EditForm.propTypes = {
  className: PropTypes.string,
  editOrganization: PropTypes.func,
  organizationData: PropTypes.any
};

export default EditForm;
