import React, { useEffect, useState } from 'react';
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
  makeStyles
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CreateForm = ({ createOrganization, handleChange, className, ...rest }) => {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);
  useEffect(() => {
    const getOrganizationsList = async () => {
      let organizations = await axios.get('http://localhost:4000/organization/list', {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      organizations = organizations.data.organizations.map((organization) => {
        return {
          organizationName: organization.organizationName,
          organizationId: organization.orgUniqueId
        }
      })
      setOrganizationsList(organizations)
      console.log('company create organizations...', organizationsList)
    }
    getOrganizationsList()
  }, [])
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Create Company"
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
                helperText="Please specify the Company name"
                label="Company name"
                name="companyName"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Organization code"
                name="organizationCode"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Organization Email"
                name="organizationEmail"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Organization Phone"
                name="organizationPhone"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Organization Contact Name"
                name="organizationContactName"
                onChange={handleChange}
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Organization Contact Phone"
                name="organizationContactPhone"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Organization"
                name="organization"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {organizationsList.map((option) => (
                  <option
                    key={option.orgUniqueId}
                    value={option.organizationName}
                  >
                    {option.organizationName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Zip"
                name="zipcode"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
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
            onClick={createOrganization}
          >
            Create organization
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
