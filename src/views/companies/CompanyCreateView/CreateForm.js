import React, { useEffect, useState } from 'react';
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
  makeStyles,
  Select,
  MenuItem
} from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CreateForm = ({ createCompany, handleChange, className, ...rest }) => {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);
  const { companyUniqeId } = useParams();

  const getCompanyById = async (companyUniqeId) => {
    const companyDetails = await axios.get(`http://localhost:4000/company/${companyUniqeId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log(companyDetails);
  }

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
  
  return (
    <Formik
      initialValues={{
        companyName: '',
        companyCode: '',
        companyEmail: '',
        companyPhone: '',
        companyContactPhone: '',
        companyContactName: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        companyOrganizationId: ''
      }}
      validationSchema={Yup.object().shape({
        companyName: Yup.string().max(255).required('Company name is required'),
        companyCode: Yup.string().max(255).required('Company code is required'),
        companyEmail: Yup.string().max(255).required('Company email is required'),
        companyPhone: Yup.string().max(255).required('Company phone is required'),
        companyContactPhone: Yup.string().max(255).required('Company contact person phone is required'),
        companyContactName: Yup.string().max(255).required('Company contact person name is required'),
        address: Yup.string().max(255).required('Company address is required'),
        city: Yup.string().max(255).required('Company city is required'),
        country: Yup.string().max(255).required('Company country is required'),
        zip: Yup.string().max(255).required('Company zip is required'),
        companyOrganizationId: Yup.string().max(255).required('Select organizaiton'),

      })}
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
            {companyUniqeId } 
            <Card>
              <CardHeader
                title="Create Company"
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
                      error={Boolean(touched.companyName && errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      fullWidth
                      label="Company name"
                      name="companyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      defaultValue={values.companyName || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
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
                      defaultValue={values.companyCode || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
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
                      defaultValue={values.companyEmail || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.companyPhone && errors.companyPhone)}
                      helperText={touched.companyPhone && errors.companyPhone}
                      fullWidth
                      label="Company Phone"
                      name="companyPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      variant="outlined"
                      defaultValue={values.companyPhone || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
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
                      defaultValue={values.companyContactName || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.companyContactPhone && errors.companyContactPhone)}
                      helperText={touched.companyContactPhone && errors.companyContactPhone}
                      fullWidth
                      label="Company Contact Phone"
                      name="companyContactPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      variant="outlined"
                      defaultValue={values.companyContactPhone || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.companyDescription && errors.companyDescription)}
                      helperText={touched.companyDescription && errors.companyDescription}
                      fullWidth
                      label="Company Description"
                      name="companyDescription"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      variant="outlined"
                      defaultValue={values.companyDescription || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Select
                      error={Boolean(touched.companyOrganizationId && errors.companyOrganizationId)}
                      helperText={touched.companyOrganizationId && errors.companyOrganizationId}
                      fullWidth
                      label="Select Organization"
                      name="companyOrganizationId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                    >
                      <MenuItem value="">
                        {' '}
                        <em>None</em>
                        {' '}
                      </MenuItem>
                      {
                        organizationsList.length > 0 && organizationsList.map((org) => <MenuItem key={org.orgUniqueId} value={org.orgUniqueId}>{org.organizationName}</MenuItem>)
                      }
                    </Select>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      defaultValue={values.address || ""}
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
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
                      label="City"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      defaultValue={values.country || ""}
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
                      defaultValue={values.state || ""}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      onChange={handleChange}
                      required
                      variant="outlined" defaultValue={values.country || ""}
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
                      defaultValue={values.zip || ""}
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
                  onClick={createCompany}
                  disabled={isSubmitting}
                >
                  Create Company
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
  createCompany: PropTypes.func,
  handleChange: PropTypes.func
};

export default CreateForm;
