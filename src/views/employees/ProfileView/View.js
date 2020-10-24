import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Grid, Paper, Table, TableRow
} from '@material-ui/core';
import MuiTableCell from '@material-ui/core/TableCell';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TableCell = withStyles({
  root: {
    borderBottom: 'none'
  }
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function EmployeeViewTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [employeeDetails, setEmployeeDetails] = useState(null);
  const { empUniqueId } = useParams();

  const getEmployeeById = async () => {
    const empDetails = empUniqueId && await axios.get(`http://localhost:4000/employee/${empUniqueId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    setEmployeeDetails(empDetails.data);
  };

  useEffect(() => {
    const getEmployee = async () => {
      await getEmployeeById();
    };
    getEmployee();
  }, []);

  return (
    <div>
      {
        employeeDetails
        && (
          <>
            <Grid container spacing={3}>
              <Grid item sm={4}>
                <Paper elevation={3} className={classes.margin}>
                  <div><img style={{ width: '100%' }} src={employeeDetails.profileImageURL} alt={employeeDetails.firstName} /></div>
                </Paper>
              </Grid>
              <Grid item sm={8}>
                <Paper>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Personal" {...a11yProps(0)} />
                    <Tab label="Employeement" {...a11yProps(1)} />
                    <Tab label="Other Details" {...a11yProps(2)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Table size="small">
                      <TableRow>
                        <TableCell>Employee ID</TableCell>
                        <TableCell>{employeeDetails.empId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>
                          {employeeDetails.firstName}
                          {' '}
                          {employeeDetails.lastName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>{employeeDetails.userName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{employeeDetails.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Contact</TableCell>
                        <TableCell>{employeeDetails.phone || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Father's Name</TableCell>
                        <TableCell>{employeeDetails.fathersName || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gender</TableCell>
                        <TableCell>{employeeDetails.gender || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mother Tounge</TableCell>
                        <TableCell>{employeeDetails.motherTounge || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Marital Status</TableCell>
                        <TableCell>{employeeDetails.maritalStatus || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Aadhar</TableCell>
                        <TableCell>{employeeDetails.aadharCardNumber || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>PAN</TableCell>
                        <TableCell>{employeeDetails.panCardNumber || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>DOB</TableCell>
                        <TableCell>{employeeDetails.dob || '--'}</TableCell>
                      </TableRow>
                    </Table>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Table size="small">
                      <TableRow>
                        <TableCell>Date Of Joining</TableCell>
                        <TableCell>{employeeDetails.dateOfJoining}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Experience</TableCell>
                        <TableCell>
                          {employeeDetails.workExperience.years}
                          {' '}
                          year
                          {' '}
                          {' '}
                          {' '}
                          {employeeDetails.workExperience.months}
                          {' '}
                          months
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Organisation</TableCell>
                        <TableCell>{employeeDetails.organization.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Company</TableCell>
                        <TableCell>{employeeDetails.company.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Designation</TableCell>
                        <TableCell>{employeeDetails.designation.name || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Department</TableCell>
                        <TableCell>{employeeDetails.department.name || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Job Type</TableCell>
                        <TableCell>{employeeDetails.jobType || '--'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Work Type</TableCell>
                        <TableCell>{employeeDetails.workType || '--'}</TableCell>
                      </TableRow>
                    </Table>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Table size="small">
                      <TableRow>
                        <TableCell>Address Lane</TableCell>
                        <TableCell>{employeeDetails.employeeAddress.address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>{employeeDetails.employeeAddress.city}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>State</TableCell>
                        <TableCell>{employeeDetails.employeeAddress.state}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>{employeeDetails.employeeAddress.country}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Zipcode</TableCell>
                        <TableCell>{employeeDetails.employeeAddress.zipcode}</TableCell>
                      </TableRow>
                    </Table>
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </>
        )
      }
    </div>
  );
}
