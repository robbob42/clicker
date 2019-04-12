import React from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function LinearDeterminate({ secondsTillAutoCoin }) {
  const classes = useStyles();
  const linearValue = (secondsTillAutoCoin === 0) ? 100 : secondsTillAutoCoin * 20;
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={linearValue} />
    </div>
  );
}

LinearDeterminate.propTypes = {
  secondsTillAutoCoin: PropTypes.number.isRequired,
};

export default LinearDeterminate;
