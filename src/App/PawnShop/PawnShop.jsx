import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Typography, AppBar,
  withStyles, Tabs, Tab,
} from '@material-ui/core';

import PawnBuy from './PawnBuy/PawnBuy';

const styles = theme => ({
  paper: {
    padding: '20px 0px',
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function PawnShop({ classes }) {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleChangeTab(event, newValue) {
    setSelectedTab(newValue);
  }
  
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item>
          <Typography>
            An oily man sits behind the bullet proof glass.
          </Typography>
          <AppBar position="static" className={classes.appBar} color="secondary">
            <Tabs value={selectedTab} onChange={handleChangeTab} indicatorColor="primary">
              <Tab label="Buy" disableRipple />
              <Tab label="Sell" disableRipple />
            </Tabs>
          </AppBar>
          {selectedTab === 0
            && (
              <PawnBuy />
            )
          }
          {selectedTab === 1
            && (
              <PawnBuy />
            )
          }
        </Grid>
      </Grid>
    </Paper>
  );
}

PawnShop.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PawnShop);