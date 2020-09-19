import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Spinner from "components/Spinner/Spinner";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import axios from "axios";
const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

const ChangePassword = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = () => { };
    const handleChange = () => { };
    return (
        <>
            <GridContainer
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
            >
                <GridItem style={{ width: "100%", maxWidth: 600 }}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Change password</h4>
                            <p className={classes.cardCategoryWhite}>Create Account here</p>
                        </CardHeader>
                        {loading && <Spinner />}
                        <form onSubmit={handleSubmit}>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* <TextField id="standard-basic" label="Standard" onChange={handleChange} name="username" /> */}
                                        <CustomInput
                                            name="username"
                                            onChange={handleChange}
                                            required
                                            labelText="Email address"
                                            id="email-address"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            required
                                            labelText="Password"
                                            id="pwd"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" variant="contained" color="primary">
                                    SignIn
                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );
};

export default ChangePassword;
