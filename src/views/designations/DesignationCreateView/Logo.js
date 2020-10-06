import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import FilePreviewer from 'react-file-previewer';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
};

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

const Logo = ({ onFileChange, file, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest} >

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
      <Divider />
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <FilePreviewer
            file={file}
          />
        </Box>
      </CardContent>

    </Card>
  );
};

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
