/* eslint-disable max-len */
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
import {
  useParams
} from 'react-router-dom';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
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
  const [, setDesignationById] = useState([]);
  const [state, setState] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState({ url: '' });
  const [downloadURL, setDownloadURL] = useState('');
  const [fileBlob, setBlob] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const { desgId } = useParams();

  const onFileChange = (event) => {
    const fileReader = new window.FileReader();
    const iputFile = event.target.files[0];
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
    setDesignations(designationsList.data.designations);
  };
  const getDesignationById = async () => {
    const designationById = await axios.get(`http://localhost:4000/designation/${desgId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    setFile({ url: designationById.data.organizations[0].notesURL, fileName: `${designationById.data.organizations[0].name}.pdf`, mimeType: 'application/pdf' });
    setState({
      name: designationById.data.organizations[0].name, rolesAndResponsibilities: designationById.data.organizations[0].rolesAndResponsibilities, level: designationById.data.organizations[0].level, desgUniqueId: designationById.data.organizations[0].desgUniqueId
    });
    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    };
    const base64 = designationById.data.organizations[0].notesURL.split('base64,')[1];
    const blob = b64toBlob(base64, 'application/pdf');
    const blobUrl = URL.createObjectURL(blob);
    setDownloadURL(blobUrl);
    setBlob(blob);

    setDesignationById(designationById.data.organizations[0]);
  };
  useEffect(() => {
    getDesignations();
    if (desgId) getDesignationById();
  }, [isCreated]);

  const createDesignations = async (values) => {
    try {
      state.notesURL = file.url;
      await axios.post('http://localhost:4000/designation/create', { ...values, notesURL: file.url }, { headers: { token: localStorage.getItem('empJWT') } });
      setIsCreated(true);
      setState({});
      setShowAlert(true);
      setAlertMessage('Designation added successfully!');
    } catch (error) {
      console.log('org create error', error);
    }
  };

  const editDesignations = async () => {
    try {
      state.notesURL = file.url;
      await axios.put(`http://localhost:4000/designation/${desgId}`, { ...state, notesURL: file.url }, { headers: { token: localStorage.getItem('empJWT') } });
      setIsCreated(true);
      setShowAlert(true);
      setAlertMessage('Designation updated successfully!');
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
                {alertMessage}
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
            {
              desgId != undefined ? (
                <Grid item lg={8} md={6} xs={12}>
                  <EditForm designationById={state} handleChange={handleChange} editDesignations={editDesignations} />
                </Grid>
              )
                : (
                  <Grid item lg={8} md={6} xs={12}>
                    <CreateForm handleChange={handleChange} createDesignations={createDesignations} />
                  </Grid>
                )
            }
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
