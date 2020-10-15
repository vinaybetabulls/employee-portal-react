import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, FieldArray, Field, Form } from 'formik';
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


const CreateForm = ({ createCompany, handleChange1, className, ...rest }) => {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);
  const { companyUniqeId } = useParams();
  const [companyDetails, setCompaniesDetails] = useState({});
  const [cmpAddress, setCmpAddress] = useState({});

  const getCompanyById = async (companyUniqeId) => {
    const companyDetails = await axios.get(`http://localhost:4000/company/${companyUniqeId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    setCompaniesDetails(companyDetails.data.companies[0]);
    setCmpAddress(companyDetails.data.companies[0].companyAddress[0]);
  }

  const obj = {
    "companyName": "CTS-KCH",
    "companyCode": "CTS-KCH-0056",
    "companyEmail": "cts@cts.com",
    "companyPhone": "12345676",
    "companyOrganizationId": "c192faff-12b1-4c08-b090-7679c605c8b0",
    "companyDescription": "description",
    "companyAddress": [
      {
        "_id": "5f83079609ca8709e1b608ad",
        "address": "Cochin",
        "city": "Cochin",
        "state": "Cochin",
        "country": "india",
        "zipcode": "122345"
      },
      {
        "_id": "5f83079609ca8709e1b608ad",
        "address": "Cochin",
        "city": "Cochin",
        "state": "Cochin",
        "country": "india",
        "zipcode": "00000"
      }
    ],
    "companyUniqeId": "387d3677-af94-4b4b-befc-55292c0e43fe",
    "createdBy": {
      "empUserName": "superadmin",
      "empUniqueId": "2b21fad4-df16-441e-93c5-e78df11bfccc"
    },
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
    companyUniqeId && getCompanyById(companyUniqeId);
  }, []);
  let initialValues = {
    companyName: '',
    companyCode: '',
    companyEmail: '',
    companyPhone: '',
    companyContactPhone: '',
    companyContactName: '',
    companyDescription: '',
    companyAddress: [
      {
        address: '',
        city: '',
        country: '',
        zipcode: '',
        state: '',
      }
    ],
    companyOrganizationId: ''
  }
  let formValues = companyUniqeId ? obj : initialValues;
  const schema = Yup.object().shape({
    companyName: Yup.string().max(255).required('Company name is required'),
    companyCode: Yup.string().max(255).required('Company code is required'),
    companyEmail: Yup.string().email().max(255).required('Company email is required'),
    companyPhone: Yup.string().max(255).required('Company phone is required'),
    // companyContactPhone: Yup.string().max(255).required('Company contact person phone is required'),
    // companyContactName: Yup.string().max(255).required('Company contact person name is required'),
    // companyDescription: Yup.string().max(255).required('Description is required'),
    // address: Yup.string().max(255).required('Company address is required'),
    // city: Yup.string().max(255).required('Company city is required'),
    // state: Yup.string().max(255).required('Company state is required'),
    // country: Yup.string().max(255).required('Company country is required'),
    // zipcode: Yup.string().max(255).required('Company zip is required'),
    // companyOrganizationId: Yup.number().max(255).required('Select organizaiton'),
    companyAddress: Yup.array().of(
      Yup.object().shape({
        address: Yup.string().max(255).required('Company address is required'),
        city: Yup.string().max(255).required('Company city is required'),
        state: Yup.string().max(255).required('Company state is required'),
        country: Yup.string().max(255).required('Company country is required'),
        zipcode: Yup.string().max(255).required('Company zip is required')
      })
    )
  })
  let index = 0;
  return (
    <Formik enableReinitialize
      initialValues={formValues || ""}
      validationSchema={schema}
      onSubmit={async (values) => {
        console.log('on submit values....', values);
        //createCompany(values);
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
          <Form autoComplete="off" noValidate className={clsx(classes.root, className)} onSubmit={handleSubmit} >
            <Card>
              <CardHeader title="Create Company" />
              <Divider />
              <CardContent>
                <Grid container spacing={3} >
                  <Grid item md={6} xs={12} >
                    <TextField
                      error={Boolean(touched.companyName && errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      fullWidth
                      label="Company name"
                      name="companyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required type="text"
                      variant="outlined"
                      value={values.companyName || ''}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.companyCode || ''}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.companyEmail || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.companyPhone || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.companyContactName || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.companyContactPhone || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
                    <TextField
                      error={Boolean(touched.companyDescription && errors.companyDescription)}
                      helperText={touched.companyDescription && errors.companyDescription}
                      fullWidth
                      label="Company Description"
                      name="companyDescription"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text" required
                      variant="outlined"
                      value={values.companyDescription || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.companyOrganizationId || ""}
                    >
                      <MenuItem value="">
                        {' '}
                        <em>None</em>
                        {' '}
                      </MenuItem>
                      {
                        organizationsList.length > 0 && organizationsList.map((org) => <MenuItem key={org.orgUniqueId} value={org.orgUniqueId} >{org.organizationName}</MenuItem>)
                      }
                    </Select>
                  </Grid>
                  <Grid item md={6} xs={12} >
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      value={values.address || cmpAddress.address || ""}
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.city || cmpAddress.city || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
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
                      value={values.state || cmpAddress.state || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} >
                    <TextField
                      fullWidth
                      label="Country"
                      name={`values.companyAddress[${index}].country`}
                      onChange={handleChange}
                      required
                      variant="outlined" value={values.companyAddress[index].country || ""}
                    />
                  </Grid>
                  <FieldArray
                    name="companyAddress"
                    render={arrayHelpers => (
                      <>{values.companyAddress.map((cmpAddr, index) => (
                        <><p>{values.companyAddress[index].zipcode}</p>
                          <Grid item md={6} xs={12} key={index}>
                            <Field component={TextField}
                              fullWidth
                              label="Zip"
                              name={`values.companyAddress.${index}.zipcode`}
                              required
                              variant="outlined"
                              onChange={handleChange}
                              defaultValue={values.companyAddress[index].zipcode || ''}
                            />
                          </Grid></>))}</>
                    )}
                  />

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
                  Create Company
                </Button>
              </Box>
            </Card>
          </Form>
          // eslint-disable-next-line indent
        )}
    </Formik>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string,
  createCompany: PropTypes.func,
  handleChange1: PropTypes.func
};

export default CreateForm;
