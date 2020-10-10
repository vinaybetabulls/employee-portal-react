import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%'
  },
  formControlsize: { minWidth: 160 },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// eslint-disable-next-line react/prop-types
export default function WorkExperience({ state, setState, handleChange }) {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [designationsList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
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

  const getCompaniesList = async (orgId) => {
    // let orgId = null;
    console.log(orgId);
    const companies = await axios.get(`http://localhost:4000/company/getCompanyByOrg/${orgId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    const companiesSelect = companies.data && companies.data.map((company) => {
      return {
        name: company.companyName,
        companyUniqeId: company.companyUniqeId
      };
    });
    console.log(' companiesSelect..', companiesSelect);
    setCompaniesList(companiesSelect);
  };

  const getDesingationsList = async () => {
    try {
      const designations = await axios.get('http://localhost:4000/designation/list', {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      console.log(designations.data.designations);
      setDesignationList(designations.data.designations);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartmentList = async (companyId) => {
    try {
      const departments = await axios.get(`http://localhost:4000/department/getDepartmentByCompanyId/${companyId}`, {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      console.log('departments...', departments);
      setDepartmentList(departments.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = async (evt) => {
    console.log('evt.target.innerText..', evt.target.innerText);
    const targentName = evt.target.name;
    let selectedOption;
    if (targentName === 'organization') {
      selectedOption = organizationsList.find((orgs) => {
        console.log(orgs);
        console.log(evt.target.value);
        return orgs.orgUniqueId === evt.target.value ? orgs.organizationName : null;
      });
      setState({
        ...state,
        [evt.target.name]: { id: selectedOption.orgUniqueId, name: selectedOption.organizationName }
      });
    }
    if (targentName === 'company') {
      selectedOption = companiesList.find((comp) => {
        console.log('comp....', comp);
        console.log(evt.target.value);
        return comp.companyUniqeId === evt.target.value ? comp.name : null;
      });
      setState({
        ...state,
        [evt.target.name]: { id: selectedOption.companyUniqeId, name: selectedOption.name }
      });
    }
    if (targentName === 'designation') {
      selectedOption = designationsList.find((desigation) => {
        console.log(desigation);
        console.log(evt.target.value);
        return desigation.desgUniqueId === evt.target.value ? desigation.name : null;
      });
      setState({
        ...state,
        [evt.target.name]: { id: selectedOption.desgUniqueId, name: selectedOption.name }
      });
    }
    if (targentName === 'department') {
      selectedOption = departmentList.find((department) => {
        console.log(department);
        console.log(evt.target.value);
        return department.departmentUniqueId === evt.target.value ? department.departmentName : null;
      });
      setState({
        ...state,
        [evt.target.name]:
          { id: selectedOption.departmentUniqueId, name: selectedOption.departmentName }
      });
    }
    console.log('selected org..', selectedOption);
    // eslint-disable-next-line no-unused-expressions
    targentName === 'organization' && await getCompaniesList(evt.target.value);
    // eslint-disable-next-line no-unused-expressions
    targentName === 'company' && getDepartmentList(evt.target.value);
  };

  const handleExpChange = (event) => {
    // eslint-disable-next-line react/prop-types
    const { workExperience: we } = state;
    const workExperience = { ...we, [event.target.name]: event.target.value };
    setState({
      ...state, workExperience
    });
  };

  useEffect(() => {
    const getLists = async () => {
      await getOrganizationsList();
      await getDesingationsList();
    };
    getLists();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Job Type</InputLabel>
            <Select native name="jobType" onChange={handleChange}>
              <option aria-label="None" value="" />
              <option value="contractor">Contractor</option>
              <option value="permenent">Permenent</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Work Type</InputLabel>
            <Select native name="workType" onChange={handleChange}>
              <option aria-label="None" value="" />
              <option value="fullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="freelance">Freelance</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <InputLabel htmlFor="age-native-simple">Work Experience</InputLabel> */}
          <FormControl className={classes.formControlsize}>
            <InputLabel htmlFor="age-native-simple">Experience in Years</InputLabel>
            <Select native name="years" onChange={handleExpChange}>
              <option aria-label="None" value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </FormControl>
          {' '}
          <FormControl className={classes.formControlsize}>
            <InputLabel htmlFor="age-native-simple">Experience in Months</InputLabel>
            <Select native name="months" onChange={handleExpChange}>
              <option aria-label="None" value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Organization</InputLabel>
            <Select native name="organization" onChange={handleSelectChange}>
              <option aria-label="None" value="" />
              {
                // eslint-disable-next-line max-len
                organizationsList.length > 0 && organizationsList.map((org) => <option key={org.orgUniqueId} value={org.orgUniqueId} data={org.orgUniqueId}>{org.organizationName}</option>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Company</InputLabel>
            <Select native name="company" onChange={handleSelectChange}>
              <option aria-label="None" value="" />
              {
                // eslint-disable-next-line max-len
                companiesList.length > 0 && companiesList.map((cmp) => <option key={cmp.companyUniqeId} value={cmp.companyUniqeId} data={cmp.companyUniqeId}>{cmp.name}</option>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Designation</InputLabel>
            <Select native name="designation" onChange={handleSelectChange}>
              <option aria-label="None" value="" />
              {
                // eslint-disable-next-line max-len
                designationsList.length > 0 && designationsList.map((designation) => <option key={designation.desgUniqueId} value={designation.desgUniqueId} data={designation.desgUniqueId}>{designation.name}</option>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Department</InputLabel>
            <Select native name="department" onChange={handleSelectChange}>
              <option aria-label="None" value="" />
              {
                // eslint-disable-next-line max-len
                departmentList.length > 0 && departmentList.map((departments) => <option key={departments.departmentUniqueId} value={departments.departmentUniqueId} data={departments.departmentUniqueId}>{departments.departmentName}</option>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="empId"
            label="EmpID"
            name="empId"
            fullWidth
            autoComplete="cc-csc"
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </>
  );
}
