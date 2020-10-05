import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateForm from './CreateForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DesignationCreate = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    designationDocURL: null
  })

  const uploadRolesAndResponsibilities = (evt) => {
    console.log(evt.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = function () {
      setState({ ...state, designationDocURL: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const createDesignations = async () => {
    try {

      // const createOrgResponse = await axios.post('http://localhost:4000/organization/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create designation Response..', state)
    } catch (error) {
      console.log('org create error', error)
    }
  }

  return (
    <Page className={classes.root} title="Account" >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item lg={12} md={12} xs={12} >
            <CreateForm handleChange={handleChange} createDesignations={createDesignations} uploadRolesAndResponsibilities={uploadRolesAndResponsibilities} designationDocURL={state.designationDocURL} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DesignationCreate;
