import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Paper, withStyles,
  Grid,
} from '@material-ui/core';

import LinearDeterminate from './LinearDeterminate/LinearDeterminate';

const styles = () => ({
  paper: {
    padding: 20,
    margin: 10,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

function StatsContainer({
  classes, sbcCount, clickPower, autoCoinAmount,
  autoCoinWaitSeconds, secondsTillAutoCoin, secondsPlayed,
  rockCount, diamondCount,
}) {
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography>
            {`Sticky brown ${sbcCount === 1 ? 'coin' : 'coins'} (SBCs): ${sbcCount}`}
          </Typography>
        </Grid>
        {
          rockCount !== 0
          && (
          <Grid item>
            <Typography>
              {`${rockCount === 1 ? 'Rock' : 'Rocks'}: ${rockCount}`}
            </Typography>
          </Grid>
          )
        }
        {
          diamondCount !== 0
          && (
          <Grid item>
            <Typography>
              {`${diamondCount === 1 ? 'Diamond' : 'Diamonds'}: ${diamondCount}`}
            </Typography>
          </Grid>
          )
        }
        <Grid item>
          <Typography>
            {`Current Click Power: ${clickPower}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {`Gaining ${autoCoinAmount} coin(s) every ${autoCoinWaitSeconds} second(s)`}
          </Typography>
          <LinearDeterminate
            secondsTillAutoCoin={secondsTillAutoCoin}
            autoCoinWaitSeconds={autoCoinWaitSeconds}
          />
        </Grid>
        <Grid item>
          <Typography>
            {`Current Seconds Played: ${Math.floor(secondsPlayed)}`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

StatsContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  sbcCount: PropTypes.number.isRequired,
  clickPower: PropTypes.number.isRequired,
  autoCoinAmount: PropTypes.number.isRequired,
  autoCoinWaitSeconds: PropTypes.number.isRequired,
  secondsTillAutoCoin: PropTypes.number.isRequired,
  secondsPlayed: PropTypes.number.isRequired,
  rockCount: PropTypes.number.isRequired,
  diamondCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(StatsContainer);
