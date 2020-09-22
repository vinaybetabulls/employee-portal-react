import React, { useContext } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Notifications from './Notifications';
import Password from './Password';
import { AppContext } from 'src/context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const { menuLists } = useContext(AppContext)
  console.log('menuList.. changepwd..', menuLists);
  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        {/* <Notifications /> */}
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
