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

function StoreContainer({
  classes, coinCount, addLog,
  updateCoinCount, items, buyAndEquipItem,
  equipItem,
}) {
  const localCount = coinCount;

  const attemptToBuy = (item) => {
    if (localCount >= item.cost) {
      addLog(`You bought a ${item.name}! You're click power is now ${item.itemClickPower}`);
      updateCoinCount(coinCount - item.cost);
      buyAndEquipItem(item);
    } else {
      addLog('Nice try, cheapskate!');
    }
  };

  const buildAButton = (item) => {
    if (!item.owned) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => attemptToBuy(item)}
        >
          Buy
        </Button>
      );
    }
    if (!item.equipped) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => equipItem(item)}
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
            <TableCell>Item</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Click Power</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.itemClickPower}</TableCell>
              <TableCell align="right">{item.cost}</TableCell>
              <TableCell align="right">
                { buildAButton(item) }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

StoreContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  addLog: PropTypes.func.isRequired,
  updateCoinCount: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  buyAndEquipItem: PropTypes.func.isRequired,
  equipItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(StoreContainer);
