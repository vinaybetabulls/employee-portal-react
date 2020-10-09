import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles, AppBar, Toolbar, Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateForm from './CreateForm';
import axios from 'axios';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  appBar: {
    position: 'relative',
  },
}));

const DesignationCreate = () => {
  const classes = useStyles();

  const [state, setState] = useState({})

  const [file, setFile] = useState({ url: '' });

  const onFileChange = event => {
    const fileReader = new window.FileReader();
    const file = event.target.files[0];
    console.log('file....', file);
    console.log('file name....', file.name);
    console.log('file mimetype....', file.type);

    fileReader.onload = fileLoad => {
      const { result } = fileLoad.target;
      setFile({ url: result, fileName: file.name, mimeType: file.type });
    };

    fileReader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const createDesignations = async () => {
    try {
      state.notesURL = file.url;
      const createOrgResponse = await axios.post('http://localhost:4000/designation/create', state, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create designation Response..', createOrgResponse)
    } catch (error) {
      console.log('org create error', error)
    }
  }

  return (
    <>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Create Designation
          </Typography>
        </Toolbar>
      </AppBar>
      <Page className={classes.root} title="Account" >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={4} md={6} xs={12} >
              <Logo file={file} onFileChange={onFileChange} />
            </Grid>
            <Grid item lg={8} md={6} xs={12} >
              <CreateForm handleChange={handleChange} createDesignations={createDesignations} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default DesignationCreate;
