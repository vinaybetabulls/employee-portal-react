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
    const companyLogoURL = localStorage.getItem('companyLogoURL');
    console.log(companyLogoURL)
    if (companyLogoURL == null) {
      setCompanyLogo(companyLogoURL)
    }
    else {
      setCompanyLogo('/static/logo.svg')
    }
  }, [companyLogo])
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
