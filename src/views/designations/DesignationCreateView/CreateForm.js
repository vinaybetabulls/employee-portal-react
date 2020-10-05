import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
  Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  input: {
    display: 'none',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const CreateForm = ({ createDesignations, handleChange, uploadRolesAndResponsibilities, designationDocURL, className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Create Designation"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Organization name"
                label="Designation name"
                name="designationName"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Level</InputLabel>
                <Select native name="workType" onChange={handleChange}>
                  <option aria-label="None" value="" />
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <input
                accept="*/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={uploadRolesAndResponsibilities}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">  Upload Documnet </Button>
              </label>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextareaAutosize aria-label="rolesResponsibilities textarea" rowsMin={6} placeholder="Roles and Responsibilities" />
            </Grid>
          </Grid>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Avatar
              className={classes.avatar}
              src={designationDocURL}
            />
          </Box>

        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={createDesignations}
          >
            Create Designation
          </Button>
        </Box>
      </Card>
    </form>
  );
};

CreateForm.propTypes = {
  className: PropTypes.string
};

export default CreateForm;
