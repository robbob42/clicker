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
});

function StoryContainer({
  classes, coinCount, story, updateStory,
}) {
  if (coinCount === 5) {
    updateStory('You have just clicked 5 times.  You\'re doing great!');
  }
  if (coinCount === 10) {
    updateStory('You have just clicked 10 times.  You\'re doing great!');
  }

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        alignItems="center"
      >
        <Grid item>
          <Typography>
            {story}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

StoryContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  story: PropTypes.string.isRequired,
  updateStory: PropTypes.func.isRequired,
};

export default withStyles(styles)(StoryContainer);
