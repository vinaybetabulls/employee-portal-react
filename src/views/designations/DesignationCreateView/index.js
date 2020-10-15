import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles, IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import CreateForm from './CreateForm';
import Logo from './Logo';
import Results from '../DesignationListView/Results';

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

  const [designations, setDesignations] = useState([]);
  const [state, setState] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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

  const getDesignations = async () => {
    const designationsList = await axios.get('http://localhost:4000/designation/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log('designaiotns list....', designationsList.data);
    setDesignations(designationsList.data.designations);
  };
  useEffect(() => {
    getDesignations();
  }, [isCreated]);

  const createDesignations = async (values) => {
    try {
      state.notesURL = file.url;
      const createOrgResponse = await axios.post('http://localhost:4000/designation/create', { ...values, notesURL: file.url }, { headers: { token: localStorage.getItem('empJWT') } });
      console.log('create designation Response..', createOrgResponse);
      setIsCreated(true); setState({}); setShowAlert(true);
    } catch (error) {
      console.log('org create error', error);
    }
  };

  return (
    <>
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          {
            showAlert && (
              <Alert
                severity="success"
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
                Designation added successfully!
                {' '}

              </Alert>
            )
          }
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Logo
                file={file}
                onFileChange={onFileChange}
                downloadURL={downloadURL}
                fileBlob={fileBlob}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <CreateForm handleChange={handleChange} createDesignations={createDesignations} />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Results getDesignations={getDesignations} designations={designations} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default DesignationCreate;
