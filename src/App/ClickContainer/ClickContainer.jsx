import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Paper, withStyles,
  Grid,
} from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: '20px 0px',
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function ClickContainer({
  classes, sbcCount, updateSbcCount, addLog,
  updateStory, totalClicks, updateTotalClicks,
  clickPower,
}) {
  const click = (event) => {
    if (event.nativeEvent.clientX !== 0) {
      const newsbcCount = sbcCount + clickPower;
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
      updateSbcCount(newsbcCount);
    }
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
      </Grid>
    </Paper>
  );
}

ClickContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  sbcCount: PropTypes.number.isRequired,
  updateSbcCount: PropTypes.func.isRequired,
  updateStory: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  totalClicks: PropTypes.number.isRequired,
  updateTotalClicks: PropTypes.func.isRequired,
  clickPower: PropTypes.number.isRequired,
};

export default withStyles(styles)(ClickContainer);
