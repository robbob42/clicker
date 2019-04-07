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

function CoinContainer({ classes, coinCount, updateCoinCount }) {
  const click = () => {
    updateCoinCount(coinCount + 1);
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
            Work Hard
          </Button>
        </Grid>
        <Grid item>
          <Typography>
            {`Sticky brown ${coinCount === 1 ? 'coin' : 'coins'}: ${coinCount}`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

CoinContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  updateCoinCount: PropTypes.func.isRequired,
};

export default withStyles(styles)(CoinContainer);
