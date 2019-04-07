import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Typography, Paper, withStyles,
  Grid,
} from '@material-ui/core';

const styles = theme => ({
  paper: {
    margin: '0 auto',
    width: 500,
    padding: 20,
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function ClickContainer({ classes, clickCount, updateClickCount }) {
  const click = () => {
    updateClickCount(clickCount + 1);
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={click}
            className={classes.button}
            disableRipple
          >
            Click Me
          </Button>
        </Grid>
        <Grid item>
          <Typography>
            {`You have clicked ${clickCount} ${clickCount === 1 ? 'time' : 'times'}!`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

ClickContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  clickCount: PropTypes.number.isRequired,
  updateClickCount: PropTypes.func.isRequired,
};

export default withStyles(styles)(ClickContainer);
