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
  avatar: {
    marginRight: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Results = ({ className, getDesignations, designations }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const deleteDesignation = async (designaiotnId) => {
    console.log('designaiotnId delete icon', designaiotnId);
    await axios.delete(`http://localhost:4000/designation/${designaiotnId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    });

    getDesignations();
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  function truncate(str) {
    return (str && str.length > 35) ? `${str.substring(0, 34)} ..` : str;
  }

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
                  Designation
                </TableCell>
                <TableCell>
                  Level
                </TableCell>
                <TableCell>
                  Roles & Responsibilites
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designations && designations.length > 0
                && designations.slice(0, limit).map((designation) => (
                  <TableRow
                    hover
                    key={designation.desgUniqueId}
                    selected={selectedCustomerIds.indexOf(designation.desgUniqueId) !== -1}
                  >
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        {/* <Avatar
                        className={classes.avatar}
                        src={designation.notesURL}
                      >
                        {getInitials(designation.name)}
                      </Avatar> */}
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {designation.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {designation.level}
                    </TableCell>
                    <TableCell>
                      {truncate(designation.rolesAndResponsibilities)}
                    </TableCell>
                    <TableCell>
                      {/* {
                        permissions.includes('VIEW') && (
                          <IconButton aria-label="view" className={classes.margin} id={designation.desgUniqueId}>
                            <VisibilityIcon color="primary" fontSize="small" size="small" />
                            {' '}
                          </IconButton>
                        )
                      } */}
                      {
                        permissions.includes('EDIT') && (
                          <IconButton aria-label="edit" className={classes.margin} id={designation.desgUniqueId} href={`/app/designations/${designation.desgUniqueId}`}>
                            <EditIcon fontSize="small" size="small" />
                            {' '}
                          </IconButton>
                        )
                      }
                      {
                        permissions.includes('DELETE') && (
                          <IconButton aria-label="delete" className={classes.margin} id={designation.desgUniqueId} onClick={() => deleteDesignation(designation.desgUniqueId)}>
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
        // eslint-disable-next-line no-mixed-operators
        count={designations && designations.length || 0}
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
  getDesignations: PropTypes.func,
  designations: PropTypes.any

};

export default Results;
