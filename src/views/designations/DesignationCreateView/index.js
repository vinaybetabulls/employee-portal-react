import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles, AppBar, Toolbar, Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import CreateForm from './CreateForm';
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

  const [state, setState] = useState({});

  const [file, setFile] = useState({ url: '' });
  const [downloadURL, setDownloadURL] = useState('');
  const [fileBlob, setBlob] = useState('');

  const onFileChange = (event) => {
    const fileReader = new window.FileReader();
    const iputFile = event.target.files[0];
    console.log('file....', iputFile);
    console.log('file name....', iputFile.name);
    console.log('file mimetype....', iputFile.type);

    fileReader.onload = (fileLoad) => {
      const { result } = fileLoad.target;
      setFile({ url: result, fileName: iputFile.name, mimeType: iputFile.type });
    };

    fileReader.readAsDataURL(iputFile);
    const blob = new Blob([iputFile], { type: iputFile.type });
    const objectURL = window.URL.createObjectURL(blob);
    setDownloadURL(objectURL);
    setBlob(blob);
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
      console.log('create designation Response..', createOrgResponse);
    } catch (error) {
      console.log('org create error', error);
    }
  };

  return (
    <>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Create Designation
          </Typography>
        </Toolbar>
      </AppBar>
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={4} md={6} xs={12}>
              <Logo file={file} onFileChange={onFileChange} downloadURL={downloadURL} fileBlob={fileBlob} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <CreateForm handleChange={handleChange} createDesignations={createDesignations} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default DesignationCreate;
