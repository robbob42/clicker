import React from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function LinearDeterminate({ secondsTillAutoCoin, autoCoinWaitSeconds }) {
  const classes = useStyles();
  const ratio = 100 / autoCoinWaitSeconds;
  const linearValue = (secondsTillAutoCoin === 0) ? 100 : secondsTillAutoCoin * ratio;
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={linearValue} />
    </div>
  );
}

LinearDeterminate.propTypes = {
  secondsTillAutoCoin: PropTypes.number.isRequired,
  autoCoinWaitSeconds: PropTypes.number.isRequired,
};

export default LinearDeterminate;
