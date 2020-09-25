import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
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
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Results = ({ className }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);
  const getOrganization = async () => {
    const companiesList = await axios.get('http://localhost:4000/company/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })
    console.log('organizationsList..', companiesList.data)
    setCompanies(companiesList.data.companies);

  }
  useEffect(() => {
    getOrganization();
  }, [])
  const deleteCompany = async (companyId) => {
    console.log('delete icon', companyId)
    await axios.delete(`http://localhost:4000/company/${companyId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })

    getOrganization();

  }
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
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log('table companies..', companies)}
              {companies.length > 0 && companies.slice(0, limit).map((company) => (
                <TableRow
                  hover
                  key={company.orgUniqueId}
                  selected={selectedCustomerIds.indexOf(company.orgUniqueId) !== -1}
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
                    <IconButton aria-label="delete" className={classes.margin} id={company.companyUniqeId} onClick={() => deleteCompany(company.companyUniqeId)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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
