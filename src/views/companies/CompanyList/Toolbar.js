import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles, Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from 'src/context/AppContext';


const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, debounceOnChange, ...rest }) => {
  const classes = useStyles();

  const { decoded } = useContext(AppContext)

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search Companies"
                    variant="outlined"
                    onChange={(e) => debounceOnChange(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  {decoded.user.permissions.includes('CREATE') && <Button color="primary" variant="contained" component={RouterLink} to="/app/company/create"> Add Company </Button>}
                </Box>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  debounceOnChange: PropTypes.func,
};

export default Toolbar;
