import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateForm from './DepartmentCreate/CreateForm';
import Results from './DepartmentList/Results';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Departments = () => {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [state, setState] = useState({
    departmentName: "",
    departmentCategory: "",
    companiesList: []
  });
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (event) => {
    console.log(event.target.value)
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const getdepartmentss = async () => {
    const departmentsList = await axios.get('http://localhost:4000/department/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })
    console.log('designaiotns list....', departmentsList.data);
    setDepartments(departmentsList.data.departments);
  }

  const createDepartment = async () => {
    try {
      console.log(state);
      const createDeptResponse = await axios.post('http://localhost:4000/department/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create department Response..', createDeptResponse);
      setIsCreated(true);
      setShowAlert(true);
      setState({
        departmentName: "",
        departmentCategory: "",
        companiesList: []
      });
    } catch (error) {
      console.log('org create error', error)
    }
  }

  useEffect(() => {
    getdepartmentss();
  }, [isCreated])

  return (
    <Page className={classes.root} title="Account" >
      <Container maxWidth="lg">
        {
          showAlert && <Alert severity="success" action={
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
          }>
            Department added successfully! </Alert>
        }
        <Grid container spacing={3} >
          <Grid item lg={12} md={12} xs={12} >
            <CreateForm handleChange={handleChange} createdepartment={createDepartment} state={state} />
          </Grid>
          <Grid item lg={12} md={12} xs={12} >
            <Results getdepartmentss={getdepartmentss} departments={departments} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Departments
