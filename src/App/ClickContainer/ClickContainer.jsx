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

function ClickContainer({
  classes, coinCount, updateCoinCount, addLog,
  updateStory, totalClicks, updateTotalClicks,
  clickPower,
}) {
  const click = () => {
    const newCoinCount = coinCount + clickPower;
    const newTotalClicks = totalClicks + 1;

    let storyLine;
    if (newTotalClicks === 5) {
      storyLine = 'You have just clicked 5 times.  You\'re doing great!';
      addLog(storyLine);
      updateStory(storyLine);
    }
    if (newTotalClicks === 10) {
      storyLine = 'You have just clicked 10 times.  You\'re doing great!';
      addLog(storyLine);
      updateStory(storyLine);
    }
    updateTotalClicks(newTotalClicks);
    updateCoinCount(newCoinCount);
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
        <Grid item>
          <Typography>
            {`Current Click Power: ${clickPower}`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

ClickContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  updateCoinCount: PropTypes.func.isRequired,
  updateStory: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  totalClicks: PropTypes.number.isRequired,
  updateTotalClicks: PropTypes.func.isRequired,
  clickPower: PropTypes.number.isRequired,
};

export default withStyles(styles)(ClickContainer);
