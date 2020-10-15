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
  MenuItem, InputLabel, FormControl, Input
} from '@material-ui/core';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    minWidth: "100%",
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

const CreateForm = ({ createdepartment, handleChange, state, className, ...rest }) => {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const theme = useTheme();

  const validationSchema = Yup.object().shape({
    departmentName: Yup.string().max(255).required('Department name is required'),
    departmentCategory: Yup.string().max(255).required('Department name is required'),
    companiesList: Yup.array().of(Yup.string().max(255).required('Companies is required')),
  })

  const formik = useFormik({
    initialValues: {
      departmentName: '',
      departmentCategory: "",
      companiesList: [],
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    const getCompaniesList = async () => {
      const companies = await axios.get(`http://localhost:4000/company/list`, {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      console.log(companies);
      const companiesSelect = companies.data && companies.data.companies && companies.data.companies.map((company) => {
        return {
          companyName: company.companyName,
          companyUniqeId: company.companyUniqeId
        }
      })
      console.log(' companiesSelect..', companiesSelect)
      setCompanies(companiesSelect)
    }
    getCompaniesList()
  }, [])
  return (
    <form onSubmit={formik.handleSubmit}  autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest} >
      <Card>
        <CardHeader title="Create Department" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} >
            <Grid item sm={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.departmentName && formik.errors.departmentName)}
                helperText={formik.touched.departmentName && formik.errors.departmentName}
                id="name"
                name="departmentName"
                label="Department Name"
                fullWidth
                autoComplete="family-name" defaultValue=""
                onChange={formik.handleChange}
                value={formik.values.departmentName || ''}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-mutiple-name-label">Department Category</InputLabel>
                <Select labelId="demo-mutiple-name-label"
                  error={Boolean(formik.touched.departmentCategory && formik.errors.departmentCategory)}
                  helperText={formik.touched.departmentCategory && formik.errors.departmentCategory}
                  id="demo-mutiple-name"
                  onChange={formik.handleChange}
                  value={formik.values.departmentCategory || ''}
                  input={<Input />}
                  MenuProps={MenuProps}  
                  name="departmentCategory" >
                  <MenuItem value="low"> Low </MenuItem>
                  <MenuItem value="medium"> Medium </MenuItem>
                  <MenuItem value="high"> High </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Select Companies</InputLabel>
                <Select variant="outlined"
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple={true}
                  value={state.companiesList || ''}
                  onChange={handleChange}
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
        <Box display="flex" justifyContent="flex-end" p={2} >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Create
          </Button>
        </Box>
      </Card>
    </form>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string
};

export default CreateForm;
