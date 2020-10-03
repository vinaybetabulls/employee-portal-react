import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { set } from 'lodash';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  formControlsize: { minWidth: 160 },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function WorkExperience({ state, setState, handleChange }) {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);

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
      }
    })
    setOrganizationsList(organizationSelect)
  }

  const getCompaniesList = async (orgId) => {
    //let orgId = null;
    console.log(orgId)
    const companies = await axios.get(`http://localhost:4000/company/getCompanyByOrg/${orgId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    const companiesSelect = companies.data && companies.data.map((company) => {
      return {
        name: company.companyName,
        companyUniqId: company.companyUniqId
      }
    })
    console.log(' companiesSelect..', companiesSelect)
    setCompaniesList(companiesSelect)
  }

  const handleSelectChange = async (evt) => {
    setState({
      ...state,
      [evt.target.name]: { 'id': evt.target.value, 'name': evt.target.innerText }
    });
    evt.target.name === 'organization' && await getCompaniesList(evt.target.value);
  }

  const handleExpChange = (event) => {
    let { workExperience: we } = state
    let workExperience = { ...we, [event.target.name]: event.target.value }
    setState({
      ...state, workExperience
    })
  }


  useEffect(() => {
    const getLists = async () => {
      await getOrganizationsList();
    };
    getLists();
  }, [])



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
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
          </FormControl>{" "}
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
            <Select native name="organization" onChange={handleSelectChange} >
              <option aria-label="None" value="" />
              {
                organizationsList.length > 0 && organizationsList.map(org => <option key={org.orgUniqueId} value={org.orgUniqueId} data={org.organizationName}>{org.organizationName}</option>)
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
                companiesList.length > 0 && companiesList.map(cmp => <option key={cmp.companyUniqId} value={cmp.companyUniqId}>{cmp.name}</option>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Designation</InputLabel>
            <Select native name="jobType">
              <option aria-label="None" value="" />
              <option value={12345}>Developer</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Department</InputLabel>
            <Select native name="workType">
              <option aria-label="None" value="" />
              <option value={12345}>UI</option>
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
    </React.Fragment>
  );
}