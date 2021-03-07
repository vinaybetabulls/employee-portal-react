import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import debounce from 'lodash.debounce';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
  }
}));

const EmployeestListView = () => {
  const classes = useStyles();
  const [searchEmployee, setEmployeeSearch] = React.useState();
  function onChange(value) {
    if (value === '') {
      setEmployeeSearch();
    }
    setEmployeeSearch(value);
  }

  const debounceOnChange = React.useCallback(debounce(onChange, 400), []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar debounceOnChange={debounceOnChange} />
        <Box mt={3}>
          <Results searchEmployee={searchEmployee } />
        </Box>
      </Container>
    </Page>
  );
};

export default EmployeestListView;
