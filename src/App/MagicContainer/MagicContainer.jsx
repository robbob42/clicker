import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Paper, Button,
} from '@material-ui/core/';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    backgroundColor: theme.palette.grey[400],
  },
});

function MagicContainer({
  classes, coinCount, addLog,
  updateCoinCount, magicItems, buyAndEquipMItem,
  equipMItem,
}) {
  const localCount = coinCount;

  const attemptToBuyMItem = (mItem) => {
    if (localCount >= mItem.cost) {
      addLog(`You bought a ${mItem.name}!`);
      updateCoinCount(coinCount - mItem.cost);
      buyAndEquipMItem(mItem);
    } else {
      addLog('Nice try, cheapskate!');
    }
  };

  const buildAButton = (mItem) => {
    if (!mItem.owned) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => attemptToBuyMItem(mItem)}
        >
          Buy
        </Button>
      );
    }
    if (!mItem.equipped) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => equipMItem(mItem)}
        >
          Equip
        </Button>
      );
    }
    return (
      <div>Equipped</div>
    );
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Magical Item</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Seconds Till Reward</TableCell>
            <TableCell align="right">Reward Amount</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {magicItems.map(mItem => (
            <TableRow key={mItem.id}>
              <TableCell component="th" scope="row">
                {mItem.name}
              </TableCell>
              <TableCell align="right">{mItem.description}</TableCell>
              <TableCell align="right">{mItem.iterationLength}</TableCell>
              <TableCell align="right">{mItem.coinsPerIteration}</TableCell>
              <TableCell align="right">{mItem.cost}</TableCell>
              <TableCell align="right">
                { buildAButton(mItem) }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

MagicContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  addLog: PropTypes.func.isRequired,
  updateCoinCount: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  magicItems: PropTypes.array.isRequired,
  buyAndEquipMItem: PropTypes.func.isRequired,
  equipMItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(MagicContainer);
