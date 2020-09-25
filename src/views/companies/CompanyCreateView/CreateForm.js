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
  makeStyles,
  Select,
  MenuItem
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CreateForm = ({ createCompany, handleChange, className, ...rest }) => {
  const classes = useStyles();
  const [organizationsList, setOrganizationsList] = useState([]);
  useEffect(() => {
    const getOrganizationsList = async () => {
      const organizations = await axios.get('http://localhost:4000/organization/list', {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      });
      const organizationSelect = organizations.data.organizations.map((organization) => {
        return {
          organizationName: organization.organizationName,
          orgUniqueId: organization.orgUniqueId
        }
      })
      console.log('vinay organizationSelect..', organizationSelect)
      setOrganizationsList(organizationSelect)
      console.log('company create organizations...', organizationSelect)
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
                label="Company code"
                name="companyCode"
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
                label="Company Email"
                name="companyEmail"
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
                label="Company Phone"
                name="companyPhone"
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
                label="Company Contact Name"
                name="companyContactName"
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
                label="Company Contact Phone"
                name="companyContactPhone"
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
                label="Company Description"
                name="companyDescription"
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
              <Select
                fullWidth
                label="Select Organization"
                name="companyOrganizationId"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  organizationsList.length > 0 && organizationsList.map(org => <MenuItem key={org.orgUniqueId} value={org.orgUniqueId}>{org.organizationName}</MenuItem>)
                }
              </Select>
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
            onClick={createCompany}
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
