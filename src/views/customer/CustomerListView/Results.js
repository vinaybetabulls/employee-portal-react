import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Link
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'src/context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    margin: theme.spacing(0),
    padding: '5px'
  }
}));

const Results = ({ className, organizationSearch = undefined }) => {
  const classes = useStyles();
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [organizations, setOrganizations] = useState([]);
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const [totalOrgnizations, setTotalOrganizations] = useState(0);
  const getOrganization = async () => {
    let organizationsList;
    if (!organizationSearch) {
      try {
        organizationsList = await axios.get(`http://localhost:4000/organization/list?pageNumber=${page}&pageLimit=${limit}`, {
          headers: {
            token: localStorage.getItem('empJWT')
          }
        });
        setTotalOrganizations(organizationsList.data.totalOrganizaitons);
        setOrganizations(organizationsList.data.organizations);
      } catch (error) {
        if (error.response?.status === 404) {
          setOrganizations([]);
          setTotalOrganizations(0);
        }
      }

    }
    else {
      try {
        organizationsList = await axios.get(`http://localhost:4000/organization/list?pageNumber=${page}&pageLimit=${limit}&search=${organizationSearch}`, {
          headers: {
            token: localStorage.getItem('empJWT')
          }
        });
        setTotalOrganizations(organizationsList.data.totalOrganizaitons);
        setOrganizations(organizationsList.data.organizations);
      } catch (error) {
        if (error.response.status === 404) {
          setOrganizations([]);
          setTotalOrganizations(0);
        }
      };
    }
    // setLimit(organizationsList.data.pageLimit);
  };
  useEffect(() => {
    getOrganization();
  }, [page, limit, organizationSearch]);
  const deleteOrganization = async (orgId) => {
    await axios.delete(`http://localhost:4000/organization/${orgId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    getOrganization();
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    // getOrganization();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    // getOrganization();
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table size="small">
            <TableHead>
              <TableRow>
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
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.length > 0 ? organizations.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.orgUniqueId}
                  selected={selectedCustomerIds.indexOf(customer.orgUniqueId) !== -1}
                >
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
                  <TableCell>
                    {
                      permissions.includes('VIEW') && (
                        <IconButton aria-label="view" href={`/app/organization/${customer.orgUniqueId}`} className={classes.margin} id={customer.orgUniqueId}>
                          <VisibilityIcon color="primary" fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }
                    {
                      permissions.includes('EDIT') && (
                        <IconButton component={Link} href={`/app/organization/edit/${customer.orgUniqueId}`} aria-label="edit" className={classes.margin} id={customer.orgUniqueId}>
                          <EditIcon fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }
                    {
                      permissions.includes('DELETE') && (
                        <IconButton aria-label="delete" className={classes.margin} id={customer.orgUniqueId} onClick={() => deleteOrganization(customer.orgUniqueId)}>
                          <DeleteIcon color="error" fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))
                : <p>Organizations not found</p>}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalOrgnizations || 0}
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
  className: PropTypes.string,
  organizationSearch: PropTypes.any
};

export default Results;
