import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Paper, Button,
} from '@material-ui/core/';

import { currencySpecs } from '../../../static/currency';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function PawnBuy({
  classes, addLog, sbcCount, updateSbcCount,
  buyCurrency,
}) {
  const attemptToBuyItem = (item) => {
    if (sbcCount >= item.sbcRatio) {
      addLog(`You bought a ${item.name}!`);
      buyCurrency(item, 1);
    } else {
      addLog('Nice try, cheapskate!');
    }
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencySpecs.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right">{item.sbcRatio.toLocaleString()}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  className={classes.button}
                  disableRipple
                  onClick={() => attemptToBuyItem(item)}
                >
                  Buy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

PawnBuy.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  sbcCount: PropTypes.number.isRequired,
  addLog: PropTypes.func.isRequired,
  updateSbcCount: PropTypes.func.isRequired,
  buyCurrency: PropTypes.func.isRequired,
};

export default withStyles(styles)(PawnBuy);
