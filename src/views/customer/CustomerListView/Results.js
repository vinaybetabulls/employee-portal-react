import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [organizations, setOrganizations] = useState([])
  useEffect(() => {
    const getOrganization = async () => {
      const organizationsList = await axios.get('http://localhost:4000/organization/list', {
        headers: {
          token: localStorage.getItem('empJWT')
        }
      })
      console.log('organizationsList..', organizationsList.data)
      setOrganizations(organizationsList.data.organizations);

    }

    getOrganization();
  }, [])
  console.log('customers....', organizations)
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = organizations.map((customer) => customer.orgUniqueId);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === organizations.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < organizations.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Organization Name
                </TableCell>
                <TableCell>
                  Organization Code
                </TableCell>
                <TableCell>
                  Organization Email
                </TableCell>
                <TableCell>
                  Organization Phone
                </TableCell>
                <TableCell>
                  Organization Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log('table', organizations)}
              {organizations.length > 0 && organizations.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.orgUniqueId}
                  selected={selectedCustomerIds.indexOf(customer.orgUniqueId) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.orgUniqueId) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.orgUniqueId)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={customer.organizationLogoURL}
                      >
                        {getInitials(customer.organizationName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.organizationName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.organizationCode}
                  </TableCell>
                  <TableCell>
                    {customer.organizationEmail}
                  </TableCell>
                  <TableCell>
                    {customer.organizationPhone}
                  </TableCell>
                  <TableCell>
                    {`${customer.organizationAddress[0].city}, ${customer.organizationAddress[0].state}, ${customer.organizationAddress[0].country}`}
                  </TableCell>
                  {/* <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={organizations.length || 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
