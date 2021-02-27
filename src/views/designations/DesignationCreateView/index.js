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
import EditForm from './EditForm';
import Logo from './Logo';
import Results from '../DesignationListView/Results';
import {
  useParams
} from "react-router-dom";

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
  const [designationById, setDesignationById] = useState([]);
  const [state, setState] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState({ url: '' });
  const [downloadURL, setDownloadURL] = useState('');
  const [fileBlob, setBlob] = useState('');

  let { desgId } = useParams();

  const onFileChange = (event) => {
    const fileReader = new window.FileReader();
    const iputFile = event.target.files[0];
    // console.log('file....', iputFile);
    // console.log('file name....', iputFile.name);
    // console.log('file mimetype....', iputFile.type);

    fileReader.onload = (fileLoad) => {
      const { result } = fileLoad.target;
      setFile({ url: result, fileName: iputFile.name, mimeType: iputFile.type });
    };

    fileReader.readAsDataURL(iputFile);
    const blob = new Blob([iputFile], { type: iputFile.type });
    const objectURL = window.URL.createObjectURL(blob);
    console.log(objectURL);
    console.log(blob)
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
  const dataUrlToFile = async (data, fileName) => {

    // var bufferArray = base64ToArrayBuffer(data);
    // var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(blobStore);
    //     return;
    // }
    // var data = window.URL.createObjectURL(blobStore);
    // var link = document.createElement('a');
    // document.body.appendChild(link);
    // link.href = data;
    // link.download = "file.pdf";
    // link.click();
    // window.URL.revokeObjectURL(data);
    // link.remove();

}
  const getDesignationById = async () => {
    const designationById = await axios.get('http://localhost:4000/designation/'+desgId, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log('designaiotns by id....', designationById.data);
    dataUrlToFile(designationById.data.organizations[0].notesURL, "test")
    setFile({url: designationById.data.organizations[0].notesURL, fileName: 'test.pdf', mimeType: "application/pdf"  })

		const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
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
    
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    let base64 = designationById.data.organizations[0].notesURL.split('base64,')[1];
    const blob = b64toBlob(base64, "application/pdf");
    const blobUrl = URL.createObjectURL(blob);
    console.log(blob); console.log(blobUrl);
		setDownloadURL(blobUrl);
    setBlob(blob);
    

    setDesignationById(designationById.data.organizations[0]);
  };
  useEffect(() => {
    getDesignations();
    desgId && getDesignationById();
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

  const editDesignations = async (values) => {
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
            {
              desgId != undefined ? <Grid item lg={8} md={6} xs={12}>
              <EditForm designationById={designationById} handleChange={handleChange} editDesignations={editDesignations} />
            </Grid> :
            <Grid item lg={8} md={6} xs={12}>
              <CreateForm handleChange={handleChange} createDesignations={createDesignations} />
            </Grid>
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
