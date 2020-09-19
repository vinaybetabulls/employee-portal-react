import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import Spinner from "components/Spinner/Spinner";
import Admin from "layouts/Admin";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box } from "@material-ui/core";
import axios from "axios";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Login() {
  const classes = useStyles();
  const [userCredentials, setUserCredentials] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  const handleChange = (event) => {
    console.log(event.target.value);
    setUserCredentials({ ...userCredentials, [event.target.name]: event.target.value });
  };

  const signInUser = async () => {
    const data = {};
    const userDetails = await axios.post('http://localhost:3001/employee/login', {
      "username": "superadmin",
      "password": "superadmin"
    });
    console.log(userDetails.data);
    localStorage.setItem('empJWT', userDetails.data.jwt);
    return userDetails.data;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    let {
      jwt
    } = await signInUser();
    jwt && setIsAuth(true);
    setLoading(false);

  }
  return (

    isAuth ? <Admin /> : <div>
      <GridContainer spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }} >
        <GridItem style={{ width: "100%", maxWidth: 600 }}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login</h4>
              <p className={classes.cardCategoryWhite}>Create Account here</p>
            </CardHeader>
            {(loading) && <Spinner />}
            <form onSubmit={handleSubmit}>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <TextField id="standard-basic" label="Standard" onChange={handleChange} name="username" /> */}
                    <CustomInput name="username" onChange={handleChange} required labelText="Email address" id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput type="password" name="password" onChange={handleChange} required labelText="Password" id="pwd"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" variant="contained" color="primary">SignIn</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
