/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem, InputLabel, FormControl, Input,
  IconButton
} from '@material-ui/core';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';

const useStyles = makeStyles(() => ({
  root: {},
  formControl: {
    minWidth: '100%',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EditForm = ({
  className, departmentId, state,getdepartmentss, ...rest
}) => {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [department, setDepartment] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [departmentCategory, setDepartmentCategoty] = useState(null);
  const [deptName, setDeptName] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [severityValue, setSeverityValue] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
  const theme = useTheme();
  console.log('departmentId...in edit department form....', departmentId);

  // const validationSchema = Yup.object().shape({
  //   departmentName: Yup.string().max(255).required('Department name is required'),
  //   departmentCategory: Yup.string().max(255).required('Department name is required'),
  //   companiesList: Yup.array().of(Yup.string().max(255).required('Companies is required')),
  // });

  const getDepartmentById = async () => {
    const departmentData = await axios.get(`http://localhost:4000/getDepartment/${departmentId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log(departmentData.data.department);
    setDepartment(departmentData.data.department);
    setSelectedCompanies(departmentData.data.department.companiesList);
    setDepartmentCategoty(departmentData.data.department.departmentCategory);
    setDeptName(departmentData.data.department.departmentName);
  };
  const getCompaniesList = async () => {
    const companiesList = await axios.get('http://localhost:4000/company/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log(companies);
    const companiesSelect = companiesList.data && companiesList.data.companies && companiesList.data.companies.map((company) => {
      return {
        companyName: company.companyName,
        companyUniqeId: company.companyUniqeId
      };
    });
    console.log(' companiesSelect..', companiesSelect);
    setCompanies(companiesSelect);
  };

  // handleDeptCategory

  const handleDeptCategory = (event) => {
    setDepartmentCategoty(event.target.value);
  };

  // handle department name
  const departmentHandle = (event) => {
    setDeptName(event.target.value);
  };
  useEffect(() => {
    setShowAlert(false);
    setSeverityValue('success');
    setResponseMessage('');
    getDepartmentById(departmentId);
    getCompaniesList();
  }, [departmentId]);

  const handleChangeMultiple = (event) => {
    const { value } = event.target;
    // const values = selectedCompanies;
    setSelectedCompanies(value);
  };

  // update department
  const updateDepartment = async () => {
    try {
      await axios.put(`http://localhost:4000/department/${departmentId}`,
        {
          departmentName: deptName,
          departmentCategory,
          companiesList: selectedCompanies
        }, {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      setShowAlert(true);
      setSeverityValue('success');
      setResponseMessage('Department updated successfully!');
      getDepartmentById(departmentId);
      getCompaniesList();
      getdepartmentss();
    } catch (error) {
      setShowAlert(true);
      setSeverityValue('error');
      setResponseMessage('Department updated failed!')
    }
  };

  return (
    <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
      {department && deptName
        ? (
          <Card>
            {
              showAlert && (
                <Alert
                  severity={severityValue}
                  action={(
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setShowAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  )}
                >
                  {responseMessage}
                  {' '}
                </Alert>
              )
            }
            <CardHeader title="Edit Department" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="name"
                    name="departmentName"
                    label="Department Name"
                    fullWidth
                    autoComplete="family-name"
                    defaultValue={deptName}
                    onChange={departmentHandle}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel id="demo-mutiple-name-label">Department Category</InputLabel>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      onChange={handleDeptCategory}
                      input={<Input />}
                      MenuProps={MenuProps}
                      name="departmentCategory"
                      value={departmentCategory}
                      defaultValue={departmentCategory}
                    >
                      <MenuItem value="low"> Low </MenuItem>
                      <MenuItem value="medium"> Medium </MenuItem>
                      <MenuItem value="high"> High </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Select Companies</InputLabel>
                    <Select
                      variant="outlined"
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple
                      value={selectedCompanies || ''}
                      onChange={handleChangeMultiple}
                      input={<Input />}
                      MenuProps={MenuProps}
                      name="companiesList"
                    >
                      {companies && companies.map((cmp) => (
                        <MenuItem key={cmp.companyUniqeId} value={cmp.companyUniqeId} style={getStyles(cmp.companyName, state.companiesList, theme)}>
                          {cmp.companyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={updateDepartment}
                style={{ marginRight: '10px' }}
              >
                Edit
              </Button>
              {'   '}
              <Button
                color="primary"
                variant="contained"
                type="button"
                href="/app/departments/"
              >
                Create
              </Button>
            </Box>
          </Card>
        )
        : null}
    </form>
  );
};

EditForm.propTypes = {
  className: PropTypes.string,
  departmentId: PropTypes.string,
  state: PropTypes.any,
  getdepartmentss: PropTypes.func
};

export default EditForm;
