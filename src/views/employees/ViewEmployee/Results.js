import React, { useContext, useState, useEffect } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'src/context/AppContext';

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
  const [employees, setEmployees] = useState([]);
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const getEmployees = async () => {
    const employeeList = await axios.get('http://localhost:4000/employee/employees/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })
    console.log('employeeList..', employeeList.data)
    setEmployees(employeeList.data.employees);

  }
  useEffect(() => {
    getEmployees();
  }, [])
  console.log('employees....', employees);
  const deleteEmployee = async (empUniqueId) => {
    await axios.delete(`http://localhost:4000/employee/${empUniqueId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })
    getEmployees();
  }
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = employees.map((employee) => employee.empUniqueId);
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
                  Employees Name
                </TableCell>
                <TableCell>
                  Employee Id
                </TableCell>
                <TableCell>
                  Employee Email
                </TableCell>
                <TableCell>
                  Employee Phone
                </TableCell>
                <TableCell>
                  Employee Organizaton
                </TableCell>
                <TableCell>
                  Employee Company
                </TableCell>
                {permissions.includes('DELETE') && <TableCell>
                  Delete
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log('table employees', employees)}
              {employees.length > 0 && employees.slice(0, limit).map((employee) => (
                <TableRow
                  hover
                  key={employee.empUniqueId}
                  selected={selectedCustomerIds.indexOf(employee.empUniqueId) !== -1}
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
                        src={employee.profileImageURL ? employee.profileImageURL : ''}
                      >
                        {getInitials(employee.firstName + ' ' + employee.lastName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {employee.firstName + ' ' + employee.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {employee.employeeId}
                  </TableCell>
                  <TableCell>
                    {employee.email}
                  </TableCell>
                  <TableCell>
                    {employee.phone}
                  </TableCell>
                  <TableCell>
                    {`${employee.organization ? employee.organization.name : ''}`}
                  </TableCell>
                  <TableCell>
                    {`${employee.company.name}`}
                  </TableCell>
                  {permissions.includes('DELETE') && <TableCell>
                    <IconButton aria-label="delete" className={classes.margin} id={employee.empUniqueId} onClick={() => deleteEmployee(employee.orgUniqueId)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>}
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
        count={employees.length || 0}
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
