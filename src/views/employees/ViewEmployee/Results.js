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
  makeStyles, Button, Grid
} from '@material-ui/core';
import Input from '@material-ui/core/Input';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import getInitials from 'src/utils/getInitials';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'src/context/AppContext';
import { GetRoles } from '../../../context/MenuList';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%',
  },
  margin: {
    margin: theme.spacing(0),
    padding: '5px'
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Results = ({ className, searchEmployee = null }) => {
  const rolesList = GetRoles();
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [empUniqId, setEmpUniqId] = useState('');
  const { decoded: { user: { permissions, roles } } } = useContext(AppContext);
  const [state, setState] = useState({ roles: [], permissions: [] });
  const [open, setOpen] = useState(false);
  const [noResult, setNoResult] = useState('');

  const getEmployees = async () => {
    let employeeList;
    if (!searchEmployee) {
      try {
        employeeList = await axios.get('http://localhost:4000/employee/employees/list', {
          headers: {
            token: localStorage.getItem('empJWT')
          }
        });
        setEmployees(employeeList.data.employees);
      } catch (error) {
        console.log('employee error', error)
        if (error.response.status) {
          setNoResult('Employees not found');
          setEmployees([]);
        }
      }

    }
    else {
      try {
        employeeList = await axios.get(`http://localhost:4000/employee/employees/list?search=${searchEmployee}`, {
          headers: {
            token: localStorage.getItem('empJWT')
          }
        });
        setEmployees(employeeList.data.employees);
      } catch (error) {

        console.log('employee error', error)
        if (error.response.status) {
          setNoResult('Employees not found');
          setEmployees([]);
        }
      }

    }
  };
  useEffect(() => {
    getEmployees();
  }, [open, searchEmployee]);
  const deleteEmployee = async (empUniqueId) => {
    await axios.delete(`http://localhost:4000/employee/${empUniqueId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    getEmployees();
  };
  const handleSelectAll = (event) => {
    console.log(event.target.checked);
    event.target.checked ? setState({ ...state, permissions: availablePermissions }) : setState({ ...state, permissions: [] });
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

  const handleClickOpen = ((empUniqueId, employeePermissions) => {
    setOpen(true);
    setEmpUniqId(empUniqueId);
    setState({ ...state, roles: employeePermissions[0].roles, permissions: employeePermissions[0].permissions });
    return true;
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    console.log(':: handleUpdate ::', state);
    const settingRoles = await axios.put(`http://localhost:4000/employee/updatePermissionRoles/${empUniqId}`, state, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    console.log(settingRoles);
    setOpen(false);
  };

  const availablePermissions = ['CREATE', 'VIEW', 'EDIT', 'DELETE', 'ADDITIONAL'];
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
                  Name
                </TableCell>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Organizaton
                </TableCell>
                <TableCell>
                  Company
                </TableCell>
                {roles.includes('SUPER_ADMIN') && <TableCell> Set Permissions </TableCell>}
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                employees.length > 0
                  ? employees.slice(0, limit).map((employee) => (
                    <TableRow
                      hover
                      key={employee.empUniqueId}
                      selected={selectedCustomerIds.indexOf(employee.empUniqueId) !== -1}
                    >
                      <TableCell>
                        <Box
                          alignItems="center"
                          display="flex"
                        >
                          <Avatar
                            className={classes.avatar}
                            src={employee.profileImageURL ? employee.profileImageURL : ''}
                          >
                            {getInitials(`${employee.firstName} ${employee.lastName}`)}
                          </Avatar>
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {`${employee.firstName} ${employee.lastName}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {employee.empId}
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
                      {roles.includes('SUPER_ADMIN') && (
                        <TableCell>
                          <Button variant="outlined" color="primary" onClick={() => handleClickOpen(employee.empUniqueId, employee.employeePermissions)}>
                            Set
                          </Button>
                        </TableCell>
                      )}
                      <TableCell>
                        {
                          permissions.includes('VIEW') && (
                            <IconButton aria-label="view" className={classes.margin} id={employee.orgUniqueId} href={`/app/employee/${employee.empUniqueId}`}>
                              <VisibilityIcon color="primary" fontSize="small" size="small" /> </IconButton>
                          )
                        }
                        {
                          permissions.includes('EDIT')
                          && (
                            <IconButton aria-label="edit" className={classes.margin} id={employee.orgUniqueId} href={`/app/employee/edit/${employee.empUniqueId}`}>
                              <EditIcon fontSize="small" size="small" />
                            </IconButton>
                          )
                        }
                        {
                          permissions.includes('DELETE') && (
                            <IconButton aria-label="delete" className={classes.margin} id={employee.orgUniqueId} onClick={() => deleteEmployee(employee.orgUniqueId)}>
                              <DeleteIcon color="error" fontSize="small" size="small" />
                              {' '}

                            </IconButton>
                          )
                        }

                      </TableCell>
                    </TableRow>
                  ))
                  : (
                        <p>Employees not found</p>
                  )
              }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination component="div" count={employees.length || 0} onChangePage={handlePageChange} onChangeRowsPerPage={handleLimitChange} page={page} rowsPerPage={limit} rowsPerPageOptions={[5, 10, 25]} />
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Set Roles & Permissions</DialogTitle>
        <DialogContent dividers>
          {/* <DialogContentText id="alert-dialog-description"> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Roles</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={state.roles}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  name="roles"
                >
                  {!!rolesList && rolesList.map((role) => (
                    <MenuItem key={role} value={role}>
                      <Checkbox checked={state.roles.indexOf(role) > -1} />
                      <ListItemText primary={role} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* </DialogContentText> */}
          {/* <DialogContentText id="alert-dialog-description"> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Permissions</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={state.permissions}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  name="permissions"
                >
                  <MenuItem>
                    <Checkbox onChange={handleSelectAll} checked={state.permissions.length === availablePermissions.length} />
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {!!availablePermissions && availablePermissions.map((per) => (
                    <MenuItem key={per} value={per}>
                      <Checkbox checked={state.permissions.indexOf(per) > -1} />
                      <ListItemText primary={per} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  searchEmployee: PropTypes.any
};

export default Results;
