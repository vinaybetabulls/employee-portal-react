import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { AppContext } from 'src/context/AppContext';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { empId } = useContext(AppContext)

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
        oldPassword: ''
      }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string().max(255).required('New passowrd is required'),
        confirmPassword: Yup.string().max(255).required('Confirm password is required'),
        oldPassword: Yup.string().max(255).required('Old password is required')
      })}
      onSubmit={async (values) => {
        console.log("on submit pwd..", values)
        try {
          const emp = await axios.put(`http://localhost:4000/employee/updatePassword/${empId}`, values, {
            headers: { token: localStorage.getItem('empJWT') }
          });
          console.log('empp upadte pwd..', emp)
          localStorage.removeItem('empJWT');
          navigate('/')
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
          <form onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
          >
            <Card>
              <CardHeader
                subheader="Update password"
                title="Password"
              />
              <Divider />
              <CardContent>
                <TextField
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  fullWidth
                  label="Old Password"
                  helperText={touched.oldPassword && errors.oldPassword}
                  margin="normal"
                  name="oldPassword"
                  onChange={handleChange}
                  type="password"
                  value={values.oldPassword}
                  onBlur={handleBlur}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  fullWidth
                  helperText={touched.newPassword && errors.newPassword}
                  label="New Password"
                  margin="normal"
                  name="newPassword"
                  onChange={handleChange}
                  type="password"
                  value={values.newPassword}
                  onBlur={handleBlur}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  variant="outlined"
                />
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
                  Update
          </Button>
              </Box>
            </Card>
          </form>
        )}
    </Formik>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
