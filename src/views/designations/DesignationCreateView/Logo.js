import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Grid,
  Typography, IconButton
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
// import FilePreviewer from 'react-file-previewer';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  input: {
    display: 'none',
  },
}));

// eslint-disable-next-line react/prop-types
const Logo = ({
  // eslint-disable-next-line react/prop-types
  onFileChange, file, className, downloadURL, fileBlob, ...rest
}) => {
  const classes = useStyles();
  console.log('file...in logo..', file);
  const downloadFile = () => {
    console.log('download pdf..');
    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveOrOpenBlob(fileBlob, file.fileName);
    } else {
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardActions>
        <input
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={onFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">  Upload document </Button>
        </label>
      </CardActions>
      <CardContent>
        {file.fileName && (
          <>
            <Grid container wrap="nowrap">
              <Grid item md={6} xs={12}>
                <Typography noWrap>{file.fileName}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <IconButton aria-label="delete" className={classes.margin} size="small" onClick={downloadFile}>
                  <GetAppIcon fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>

    </Card>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  file: PropTypes.any
};

export default Logo;
