/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'src/context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(0),
    padding: '5px'
  },
}));

const Results = ({ className, getdepartmentss, departments }) => {
  const classes = useStyles();
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const deletedepartments = async (departmentUniqueId) => {
    console.log('departmentUniqueId delete icon', departmentUniqueId);
    await axios.delete(`http://localhost:4000/deleteDepartmentById/${departmentUniqueId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });
    getdepartmentss();
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
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell> Department Name </TableCell>
                <TableCell> Department Category </TableCell>
                <TableCell> Actions </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments && departments.length > 0 && departments.slice(0, limit).map((departments) => (
                <TableRow hover key={departments.departmentUniqueId}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {' '}
                        {departments.departmentName}
                        {' '}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {' '}
                    {departments.departmentCategory}
                    {' '}
                  </TableCell>
                  <TableCell>
                    {/* {
                      permissions.includes('VIEW') && (
                        <IconButton aria-label="view" className={classes.margin} id={departments.departmentUniqueId}>
                          <VisibilityIcon color="primary" fontSize="small" size="small" /> </IconButton>
                      )
                    } */}
                    {
                      permissions.includes('EDIT') && (
                        <IconButton aria-label="edit" className={classes.margin} id={departments.departmentUniqueId} href={`/app/departments/${departments.departmentUniqueId}`}>
                          <EditIcon fontSize="small" size="small" />
                          {' '}
                        </IconButton>
                      )
                    }
                    {
                      permissions.includes('DELETE') && (
                        <IconButton aria-label="delete" className={classes.margin} id={departments.departmentUniqueId} onClick={() => deletedepartments(departments.departmentUniqueId)}>
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
