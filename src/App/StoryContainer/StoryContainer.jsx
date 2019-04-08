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

function StoryContainer({ classes, story }) {
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
  story: PropTypes.string.isRequired,
};

export default withStyles(styles)(StoryContainer);
