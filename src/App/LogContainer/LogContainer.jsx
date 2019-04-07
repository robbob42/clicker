import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Paper, withStyles,
  Grid,
} from '@material-ui/core';

const styles = () => ({
  paper: {
    margin: '0 auto',
    width: 500,
    padding: 20,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

function LogContainer({
  classes, logItem,
}) {
  const [log, updateLog] = useState([]);

  useEffect(() => {
    log.unshift(logItem);
    updateLog(log);
  }, [logItem]);

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.logTitle}>A log of your Adventure</Typography>
          {log.map(logLine => (
            <Typography>
              {logLine}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

LogContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  logItem: PropTypes.string.isRequired,
};

export default withStyles(styles)(LogContainer);
