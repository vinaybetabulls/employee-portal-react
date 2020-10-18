import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Divider, Paper } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: '10px 0px 0px 10px'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  orgInfo: {
    padding: "24px"
  },
  h2Line: {
    lineHeight: 1.5
  },
  heading: {
    fontSize: "20px",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    fontWeight: 500,
    lineHeight: 2.2,
    letterSpacing: "-0.06px",
  }
}));

export default function OrgDetailsPage() {
  const classes = useStyles();
  const [organisationDetails, setOrganisationDetails] = useState({});
  const { orgUniqueId } = useParams();

  const getOrganisationById = async () => {
    const orgDetails = await axios.get(`http://localhost:4000/organization/${orgUniqueId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    setOrganisationDetails(orgDetails.data.organizations[0]);
  }

  useEffect(() => {
    const getOrganization = async () => {
      await getOrganisationById();
    }
    orgUniqueId && getOrganization();
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item sm={4}>
        <Paper elevation={3} className={classes.margin}>
          <div><img style={{ width: "100%" }} src={organisationDetails.organizationLogoURL} alt={organisationDetails.organizationName} /></div>
        </Paper>
      </Grid>
      <Grid item sm={8}>
        <Paper elevation={3} className={classes.margin}>
          <div className={classes.orgInfo}>
            <div style={{ marginBottom: "16px" }}>
              <div className={classes.heading}> Organisation Details</div>
              <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Code: {organisationDetails.organizationCode}</Typography>
              <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Name: {organisationDetails.organizationName}</Typography>
              <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Email: {organisationDetails.organizationEmail}</Typography>
              <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Contact: {organisationDetails.organizationPhone}</Typography>
            </div>

            <Divider variant="middle" />

            <div style={{ marginBottom: "16px", marginTop: "16px" }}>
              <div className={classes.heading}> Contact Details</div>
              {
                organisationDetails.organizationAddress && organisationDetails.organizationAddress.map(orgAdd => {
                  return <><Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Address Lane: {orgAdd.address}</Typography>
                    <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>City: {orgAdd.city}</Typography>
                    <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>State: {orgAdd.state}</Typography>
                    <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Country: {orgAdd.country}</Typography>
                    <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Zipcode: {orgAdd.zipcode}</Typography></>
                })
              }
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
