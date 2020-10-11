import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateForm from './CreateForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DepartmentsList from '../DepartmentList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CreateView = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [state, setState] = useState({
    departmentName: "",
    departmentCategory: "",
    companiesList:[]
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };
  let isAdded = false;
  const createDepartment = async () => {
    try {
      const createDeptResponse = await axios.post('http://localhost:4000/department/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create department Response..', createDeptResponse);
      // createDeptResponse && navigate('/app/department/view');
      isAdded = true;
      console.log(isAdded);
    } catch (error) {
      console.log('org create error', error)
    }
  }

  return (
    <Page className={classes.root} title="Account" >
      <Container maxWidth="lg">
        <Grid container spacing={3} >
          <Grid item lg={12} md={12} xs={12} >
            <CreateForm handleChange={handleChange} createdepartment={createDepartment} state={state} />
          </Grid>
          <Grid item lg={12} md={12} xs={12} >
            <DepartmentsList isAdded={isAdded}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateView;
