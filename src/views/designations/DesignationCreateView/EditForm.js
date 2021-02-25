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
  makeStyles,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  input: {
    display: 'none',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  teaxtareaStyles: {
    width: '100%',
  },
}));

const EditForm = ({
  createDesignations, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          level: '',
          rolesAndResponsibilities: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Designation name is required'),
          rolesAndResponsibilities: Yup.string().max(255).required('Designation roles is required'),
          level: Yup.string().max(255).required('Designation level is required'),

        })}
        onSubmit={async (values) => {
          createDesignations(values);
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
            <form
              autoComplete="off"
              noValidate
              className={clsx(classes.root, className)}
              {...rest}
              onSubmit={handleSubmit}
            >
              <Card>
                <CardHeader
                  title="Edit Designation"
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
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                        label="Designation name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Level</InputLabel>
                        <Select native name="level" onChange={handleChange}>
                          <option aria-label="None" value="" />
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                          <option value="4">Level 4</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextareaAutosize
                        // eslint-disable-next-line max-len
                        error={Boolean(touched.rolesAndResponsibilities && errors.rolesAndResponsibilities)}
                        // eslint-disable-next-line max-len
                        helperText={touched.rolesAndResponsibilities && errors.rolesAndResponsibilities}
                        className={classes.teaxtareaStyles}
                        name="rolesAndResponsibilities"
                        aria-label="rolesResponsibilities"
                        rowsMin={4}
                        placeholder="Roles and Responsibilities"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rolesAndResponsibilities}
                        variant="outlined"
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
                    Create Designation
                  </Button>
                </Box>
              </Card>
            </form>
            // eslint-disable-next-line indent
          )}
      </Formik>
    </>

  );
};

EditForm.propTypes = {
  className: PropTypes.string,
  createDesignations: PropTypes.func
};

export default EditForm;
