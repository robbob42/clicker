import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Typography, AppBar,
  withStyles, Tabs, Tab,
} from '@material-ui/core';

import SbcShop from './SbcShop/SbcShop';
import RockShop from './RockShop/RockShop';

const styles = theme => ({
  paper: {
    padding: '20px 0px',
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function PawnShop({
  classes, addLog, sbcCount, updateSbcCount,
  buyCurrency,
}) {
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
              <Tab label="SBC Shop" disableRipple />
              <Tab label="Rock Shop" disableRipple />
            </Tabs>
          </AppBar>
          {selectedTab === 0
            && (
              <SbcShop
                addLog={addLog}
                sbcCount={sbcCount}
                updateSbcCount={updateSbcCount}
                buyCurrency={buyCurrency}
              />
            )
          }
          {selectedTab === 1
            && (
              <RockShop
                addLog={addLog}
                sbcCount={sbcCount}
                updateSbcCount={updateSbcCount}
                buyCurrency={buyCurrency}
              />
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
  addLog: PropTypes.func.isRequired,
  sbcCount: PropTypes.number.isRequired,
  updateSbcCount: PropTypes.func.isRequired,
  buyCurrency: PropTypes.func.isRequired,
};

export default withStyles(styles)(PawnShop);
