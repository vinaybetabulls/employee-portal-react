import React, { useState, useEffect } from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '52px',
    maxWidth: '250px',
    height: 'auto',
    width: 'auto'
  }
}));
const Logo = (props) => {
  const classes = useStyles();
  const [companyLogo, setCompanyLogo] = useState('/static/logo.svg');
  useEffect(() => {
    const companyLogoURL = localStorage.getItem('companyLogoURL') || '/static/logo.svg';
    if (companyLogoURL !== null || companyLogoURL !== 'undefined') {
      console.log('companyLogoURL...', companyLogoURL);
      setCompanyLogo(companyLogoURL);
    } else {
      console.log('jfnasjksagdasg');
      setCompanyLogo('/static/logo.svg');
    }
  }, []);
  return (
    <img
      className={classes.root}
      alt="Logo"
      src={companyLogo}
      {...props}
    />
  );
};

export default Logo;
