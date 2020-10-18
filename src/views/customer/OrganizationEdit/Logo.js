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
  makeStyles
} from '@material-ui/core';

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

const Logo = ({
  // eslint-disable-next-line react/prop-types
  organizationLogoURL, uploadOrganizationLogo, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={organizationLogoURL}
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
          onChange={uploadOrganizationLogo}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">  Logo </Button>
        </label>
      </CardActions>
    </Card>
  );
};

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
