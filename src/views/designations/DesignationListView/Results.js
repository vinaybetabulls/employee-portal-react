import React, { useContext, useState, useEffect } from 'react';
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

const Results = ({ className }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const { decoded: { user: { permissions } } } = useContext(AppContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [designations, setDesignations] = useState([]);
  const getDesignations = async () => {
    const designationsList = await axios.get('http://localhost:4000/designation/list', {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })
    console.log('designaiotns list....', designationsList.data)
    setDesignations(designationsList.data.designations);

  }
  useEffect(() => {
    getDesignations();
  }, [])
  const deleteDesignation = async (designaiotnId) => {
    console.log('designaiotnId delete icon', designaiotnId)
    await axios.delete(`http://localhost:4000/designation/${designaiotnId}`, {
      headers: {
        token: localStorage.getItem('empJWT')
      }
    })

    getDesignations();

  }
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = designations.map((designation) => designation.desgUniqueId);
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
  function truncate(str) {
    return (str.length > 35) ? str.substring(0, 34) + " .." : str;
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
                  Designation Name
                </TableCell>
                <TableCell>
                  Designation Level
                </TableCell>
                <TableCell>
                  Designation Roles
                </TableCell>
                {permissions.includes('DELETE') && <TableCell>
                  Delete
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log('table designations..', designations)}
              {designations.length > 0 && designations.slice(0, limit).map((designation) => (
                <TableRow
                  hover
                  key={designation.desgUniqueId}
                  selected={selectedCustomerIds.indexOf(designation.desgUniqueId) !== -1}
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
                        src={designation.notesURL}
                      >
                        {getInitials(designation.name)}
                      </Avatar>
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
                  {permissions.includes('DELETE') && <TableCell>
                    <IconButton aria-label="delete" className={classes.margin} id={designation.desgUniqueId} onClick={() => deleteDesignation(designation.desgUniqueId)}>
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
        count={designations.length || 0}
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
