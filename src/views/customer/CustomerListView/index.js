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

const OrganizationView = () => {
  const classes = useStyles();
  const [organizationSearch, setOrganizationSearch] = React.useState();
  function onChange(value) {
    if (value === '') {
      setOrganizationSearch();
    }
    setOrganizationSearch(value);
  }

  const debounceOnChange = React.useCallback(debounce(onChange, 400), []);
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar debounceOnChange={debounceOnChange}/>
        <Box mt={3}>
          <Results organizationSearch={organizationSearch} />
        </Box>
      </Container>
    </Page>
  );
};

export default OrganizationView;
