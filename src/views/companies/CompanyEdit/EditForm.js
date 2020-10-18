import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Formik, FieldArray, Field, Form
} from 'formik';
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
  makeStyles,
  Select,
  MenuItem
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CreateCompanyForm = ({
  editCompany, className, companyDetails
}) => {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);

  useEffect(() => {
    const getOrganizationsList = async () => {
      const organizations = await axios.get('http://localhost:4000/organization/list', {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      const organizationSelect = organizations.data.organizations.map((organization) => {
        return {
          organizationName: organization.organizationName,
          orgUniqueId: organization.orgUniqueId
        };
      });
      setOrganizationsList(organizationSelect);
    };
    getOrganizationsList();
  }, []);

  const initialValues = {
    companyName: companyDetails.companyName || '',
    companyCode: companyDetails.companyCode || '',
    companyEmail: companyDetails.companyEmail || '',
    companyPhone: companyDetails.companyPhone || '',
    companyContactPhone: companyDetails.companyContactPhone || '',
    companyContactName: companyDetails.companyContactName || '',
    companyDescription: companyDetails.companyDescription || '',
    address: companyDetails.companyAddress[0].address || '',
    city: companyDetails.companyAddress[0].city || '',
    state: companyDetails.companyAddress[0].state || '',
    country: companyDetails.companyAddress[0].country || '',
    zipcode: companyDetails.companyAddress[0].zipcode || ''
  };
  const schema = Yup.object().shape({
    companyName: Yup.string().max(255).required('Company name is required'),
    companyCode: Yup.string().max(255).required('Company code is required'),
    companyEmail: Yup.string().email().max(255).required('Company email is required'),
    companyPhone: Yup.string().max(255).required('Company phone is required'),
    // companyContactPhone: Yup.string().max(255).required('Company contact person phone is required'),
    // companyContactName: Yup.string().max(255).required('Company contact person name is required'),
    companyDescription: Yup.string().max(255).required('Description is required'),
    address: Yup.string().max(255).required('Company address is required'),
    city: Yup.string().max(255).required('Company city is required'),
    state: Yup.string().max(255).required('Company state is required'),
    country: Yup.string().max(255).required('Company country is required'),
    zipcode: Yup.string().max(255).required('Company zip is required'),
    // companyOrganizationId: Yup.number().max(255).required('Select organizaiton'),
  });
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        console.log('on submit values....', values);
        try {
          await editCompany(values);
          resetForm();
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        isSubmitting,
        handleSubmit,
        handleChange,
        touched,
        values
      }) => (
          // eslint-disable-next-line react/jsx-indent
          <Form autoComplete="off" noValidate className={clsx(classes.root, className)} onSubmit={handleSubmit}>
            <Card>
              <CardHeader title="Update Company" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyName && errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      fullWidth
                      label="Company name"
                      name="companyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      type="text"
                      variant="outlined"
                      value={values.companyName}
                      disabled
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyCode && errors.companyCode)}
                      helperText={touched.companyCode && errors.companyCode}
                      fullWidth
                      label="Company code"
                      name="companyCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.companyCode}
                      disabled
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyEmail && errors.companyEmail)}
                      helperText={touched.companyEmail && errors.companyEmail}
                      fullWidth
                      label="Company Email"
                      name="companyEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.companyEmail}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyPhone && errors.companyPhone)}
                      helperText={touched.companyPhone && errors.companyPhone}
                      fullWidth
                      label="Company Phone"
                      name="companyPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="string"
                      variant="outlined"
                      value={values.companyPhone}
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyContactName && errors.companyContactName)}
                      helperText={touched.companyContactName && errors.companyContactName}
                      fullWidth
                      label="Company Contact Name"
                      name="companyContactName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      variant="outlined"
                      value={values.companyContactName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyContactPhone && errors.companyContactPhone)}
                      helperText={touched.companyContactPhone && errors.companyContactPhone}
                      fullWidth
                      label="Company Contact Phone"
                      name="companyContactPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="string"
                      variant="outlined"
                      value={values.companyContactPhone}
                    />
                  </Grid> */}
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.companyDescription && errors.companyDescription)}
                      helperText={touched.companyDescription && errors.companyDescription}
                      fullWidth
                      label="Company Description"
                      name="companyDescription"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      required
                      variant="outlined"
                      value={values.companyDescription}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Select
                      error={Boolean(touched.companyOrganizationId && errors.companyOrganizationId)}
                      helperText={touched.companyOrganizationId && errors.companyOrganizationId}
                      fullWidth
                      label="Select Organization"
                      name="companyOrganizationId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      value={values.companyOrganizationId || ''}
                    >
                      <MenuItem value="">
                        {' '}
                        <em>None</em>
                        {' '}
                      </MenuItem>
                      {
                        organizationsList.length > 0
                        && organizationsList.map((org) => (
                          <MenuItem key={org.orgUniqueId} value={org.orgUniqueId}>
                            {org.organizationName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      value={values.address}
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.state && errors.state}
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
                  <Grid item md={6} xs={12}>
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
                  disabled={isSubmitting}
                >
                  Update Company
                </Button>
              </Box>
            </Card>
          </Form>
          // eslint-disable-next-line indent
        )}
    </Formik>
  );
};

CreateCompanyForm.propTypes = {
  className: PropTypes.string,
  editCompany: PropTypes.func,
  companyDetails: PropTypes.any
};

export default CreateCompanyForm;
