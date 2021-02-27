/* eslint-disable max-len */
import React from 'react';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
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
  designationById, editDesignations, className, handleChange, ...rest
}) => {
  const classes = useStyles();

  return (
    <>
      {/* <Formik
        initialValues={{
          name: designationById.name,
          level: designationById.level,
          rolesAndResponsibilities: designationById.rolesAndResponsibilities
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Designation name is required'),
          rolesAndResponsibilities: Yup.string().max(255).required('Designation roles is required'),
          level: Yup.string().max(255).required('Designation level is required'),

        })}
        onSubmit={async (values) => {
          console.log('onsubmit...', values);
          editDesignations(values);
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
        }) => ( */}
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
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
                  // error={Boolean(touched.name && errors.name)}
                  // helperText={touched.name && errors.name}
                  fullWidth
                  label="Designation name"
                  name="name"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  value={designationById.name || ''}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Level</InputLabel>
                  <Select
                    native
                    name="level"
                    onChange={handleChange}
                    value={designationById.level}
                  >
                    <option aria-label="None" />
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
                  // error={Boolean(touched.rolesAndResponsibilities && errors.rolesAndResponsibilities)}
                  // // eslint-disable-next-line max-len
                  // helperText={touched.rolesAndResponsibilities && errors.rolesAndResponsibilities}
                  className={classes.teaxtareaStyles}
                  name="rolesAndResponsibilities"
                  aria-label="rolesResponsibilities"
                  rowsMin={4}
                  placeholder="Roles and Responsibilities"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  value={designationById.rolesAndResponsibilities}
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
              type="button"
              onClick={editDesignations}

            >
              Edit Designation
            </Button>
          </Box>
        </Card>
      </form>
      {/* )}
      </Formik> */}
    </>

  );
};

EditForm.propTypes = {
  className: PropTypes.string,
  editDesignations: PropTypes.func,
  designationById: PropTypes.any,
  handleChange: PropTypes.func,
};

export default EditForm;
