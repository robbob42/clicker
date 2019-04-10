import React from 'react';
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
  },
});

function LogContainer({
  classes, log,
}) {
  const logCopy = log.slice(0, 5);
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.logTitle}>A log of your Adventure</Typography>
          {logCopy.map(logLine => (
            <Typography key={logLine.id}>
              {logLine.logItem}
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
  // eslint-disable-next-line react/forbid-prop-types
  log: PropTypes.array.isRequired,
};

export default withStyles(styles)(LogContainer);
