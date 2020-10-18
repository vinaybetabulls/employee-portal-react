import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  makeStyles, Link
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'src/context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(0),
    padding: '5px'
  },
}));

const Results = ({ className }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);
  const getOrganization = async () => {
    const companiesList = await axios.get(`http://localhost:4000/company/list?pageNumber=${page}&pageLimit=${limit}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log('organizationsList..', companiesList.data);
    setCompanies(companiesList.data.companies);
  };
  useEffect(() => {
    getOrganization();
  }, [page, limit]);
  const deleteCompany = async (companyId) => {
    console.log('delete icon', companyId);
    await axios.delete(`http://localhost:4000/company/${companyId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });

    getOrganization();
  };
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = companies.map((company) => company.orgUniqueId);
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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  Company Name
                </TableCell>
                <TableCell>
                  Company Code
                </TableCell>
                <TableCell>
                  Company Email
                </TableCell>
                <TableCell>
                  Company Phone
                </TableCell>
                <TableCell>
                  Company Address
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies && companies.length > 0 && companies.slice(0, limit).map((company) => (
                <TableRow
                  hover
                  key={company.orgUniqueId}
                  selected={selectedCustomerIds.indexOf(company.orgUniqueId) !== -1}
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={company.companyLogoURL}
                      >
                        {getInitials(company.companyName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {company.organizationName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {company.companyCode}
                  </TableCell>
                  <TableCell>
                    {company.companyEmail}
                  </TableCell>
                  <TableCell>
                    {company.companyPhone}
                  </TableCell>
                  <TableCell>
                    {`${company.companyAddress[0].city}, ${company.companyAddress[0].state}, ${company.companyAddress[0].country}`}
                  </TableCell>
                  <TableCell>
                    {
                      permissions.includes('VIEW') && (
                        <IconButton aria-label="view" className={classes.margin} id={company.companyUniqeId}>
                          <VisibilityIcon color="primary" fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }
                    {
                      permissions.includes('EDIT') && (
                        <IconButton component={Link} href={`/app/company/edit/${company.companyUniqeId}`} aria-label="edit" className={classes.margin} id={company.companyUniqeId}>
                          <EditIcon fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }
                    {
                      permissions.includes('DELETE') && (
                        <IconButton aria-label="delete" className={classes.margin} id={company.companyUniqeId} onClick={() => deleteCompany(company.companyUniqeId)}>
                          <DeleteIcon color="error" fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={companies.length || 0}
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
