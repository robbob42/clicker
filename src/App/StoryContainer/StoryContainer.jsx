import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Paper, withStyles,
  Grid,
} from '@material-ui/core';

const styles = theme => ({
  paper: {
    margin: '0 auto',
    width: 300,
    padding: 20,
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function StoryContainer({
  classes, clickCount, story, updateStory,
}) {
  if (clickCount >= 10) {
    updateStory('You have just clicked 10 times.  You\'re doing great!');
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
  clickCount: PropTypes.number.isRequired,
  story: PropTypes.string.isRequired,
  updateStory: PropTypes.func.isRequired,
};

export default withStyles(styles)(StoryContainer);
