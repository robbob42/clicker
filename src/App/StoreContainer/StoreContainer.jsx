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

let id = 0;
function createData(name, description, clickPower, cost) {
  id += 1;
  return {
    id, name, description, clickPower, cost,
  };
}

const rows = [
  createData('Stick', 'It\'s brown and sticky', 2, 10),
  createData('Rusty Shovel', 'Well, it\'s better than a stick', 5, 200),
  createData('Push Lawn Mower', 'PUSH!', 10, 500),
  createData('Tractor', 'Where\'s my tractor?', 25, 1000),
  createData('Chuck Norris', 'Of course', 1000, 100000),
];

function StoreContainer({
  classes, coinCount, addLog, updateClickPower,
}) {
  const localCount = coinCount;

  const attemptToBuy = (item) => {
    if (localCount >= item.cost) {
      addLog(`You bought a ${item.name}! You're click power is now ${item.clickPower}`);
      updateClickPower(item.clickPower);
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
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Click Power</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.clickPower}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  className={classes.button}
                  disableRipple
                  onClick={() => attemptToBuy(row)}
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

StoreContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  addLog: PropTypes.func.isRequired,
  updateClickPower: PropTypes.func.isRequired,
};

export default withStyles(styles)(StoreContainer);
