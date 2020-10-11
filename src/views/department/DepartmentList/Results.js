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
import { AppContext } from 'src/context/AppContext';
const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(0),
    padding: "5px"
  },
}));

const Results = ({ className }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [departments, setDepartments] = useState([]);
  const getdepartmentss = async () => {
    const departmentsList = await axios.get('http://localhost:4000/department/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })
    console.log('designaiotns list....', departmentsList.data)
    setDepartments(departmentsList.data.departments);

  }
  useEffect(() => {
    getdepartmentss();
  }, [])
  const deletedepartments = async (designaiotnId) => {
    console.log('designaiotnId delete icon', designaiotnId)
    await axios.delete(`http://localhost:4000/department/${designaiotnId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })

    getdepartmentss();

  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function truncate(str) {
    return (str.length > 35) ? str.substring(0, 34) + " .." : str;
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table  size="small">
            <TableHead>
              <TableRow>
                <TableCell> Department Name </TableCell>
                <TableCell> Department Category </TableCell>
                <TableCell> Actions </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments && departments.length > 0 && departments.slice(0, limit).map((departments) => (
                <TableRow hover key={departments.departmentUniqueId} selected={selectedCustomerIds.indexOf(departments.departmentUniqueId) !== -1} >
                  <TableCell>
                    <Box alignItems="center" display="flex" >
                      <Typography color="textPrimary" variant="body1" > {departments.departmentName} </Typography>
                    </Box>
                  </TableCell>
                  <TableCell> {departments.departmentCategory} </TableCell>
                  <TableCell>
                    {
                      permissions.includes('VIEW') && <IconButton aria-label="view" className={classes.margin} id={departments.departmentUniqueId}>
                        <VisibilityIcon color="primary" fontSize="small" size="small"/> </IconButton>
                    }
                    {
                      permissions.includes('EDIT') && <IconButton aria-label="edit" className={classes.margin} id={departments.departmentUniqueId}>
                        <EditIcon fontSize="small" fontSize="small" size="small" /> </IconButton>
                    }
                    {
                      permissions.includes('DELETE') && <IconButton aria-label="delete" className={classes.margin} id={departments.departmentUniqueId} onClick={() => deletedepartments(departments.departmentUniqueId)}>
                        <DeleteIcon color="error" fontSize="small" size="small" /> </IconButton>
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
        count={departments && departments.length || 0}
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
