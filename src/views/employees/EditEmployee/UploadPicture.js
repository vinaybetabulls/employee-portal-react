import React from 'react'
import Grid from '@material-ui/core/Grid';
import {
  Button,
  CardActions,
  Avatar,
  Card,
  Divider,
  Box,
  CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  input: {
    display: 'none',
  },
}));

const UploadPicture = ({ state, setState, handleChange, profileImageChange }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Card className={clsx(classes.root)}>
          <CardContent>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Avatar
                className={classes.avatar}
                src={state.profileImageURL}
              />
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={profileImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span"> Profile </Button>
            </label>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UploadPicture
