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

export default function CompanyDetailsPage() {
    const classes = useStyles();
    const [companyDetails, setCompanyDetails] = useState({});
    const { companyUniqeId } = useParams();

    const getCompanyById = async () => {
        const cmpDetails = await axios.get(`http://localhost:4000/company/${companyUniqeId}`, {
            headers: {
                token: localStorage.getItem('empJWT')
            }
        });
        setCompanyDetails(cmpDetails.data.companies[0]);
    }

    useEffect(() => {
        const getCompany = async () => {
            await getCompanyById();
        }
        companyUniqeId && getCompany();
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item sm={4}>
                <Paper elevation={3} className={classes.margin}>
                    <div><img style={{ width: "100%" }} src={companyDetails.companyLogoURL} alt={companyDetails.companyLogoURL} /></div>
                </Paper>
            </Grid>
            <Grid item sm={8}>
                <Paper elevation={3} className={classes.margin}>
                    <div className={classes.orgInfo}>
                        <div style={{ marginBottom: "16px" }}>
                            <div className={classes.heading}> Company Details</div>
                            <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Code: {companyDetails.companyCode}</Typography>
                            <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Name: {companyDetails.companyName}</Typography>
                            <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom> Organisation: {companyDetails.organizationName}</Typography>

                            <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Email: {companyDetails.companyEmail}</Typography>
                            <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Contact: {companyDetails.companyPhone}</Typography>
                            <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Description: {companyDetails.companyDescription}</Typography>
                        </div>

                        <Divider variant="middle" />

                        <div style={{ marginBottom: "16px", marginTop: "16px" }}>
                            <div className={classes.heading}> Contact Details</div>
                            {
                                companyDetails.companyAddress && companyDetails.companyAddress.map(cmpAdd => {
                                    return <><Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Address Lane: {cmpAdd.address}</Typography>
                                        <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>City: {cmpAdd.city}</Typography>
                                        <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>State: {cmpAdd.state}</Typography>
                                        <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Country: {cmpAdd.country}</Typography>
                                        <Typography className={classes.h2Line} varient="h2" component="h2" gutterBottom>Zipcode: {cmpAdd.zipcode}</Typography></>
                                })
                            }
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}