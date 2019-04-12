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

function WeaponsContainer({
  classes, coinCount, addLog,
  updateCoinCount, weapons, buyAndEquipWeapon,
  equipWeapon,
}) {
  const localCount = coinCount;

  const attemptToBuyWeapon = (weapon) => {
    if (localCount >= weapon.cost) {
      addLog(`You bought a ${weapon.name}! Your click power is now ${weapon.weaponClickPower}`);
      updateCoinCount(coinCount - weapon.cost);
      buyAndEquipWeapon(weapon);
    } else {
      addLog('Nice try, cheapskate!');
    }
  };

  const buildAButton = (weapon) => {
    if (!weapon.owned) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => attemptToBuyWeapon(weapon)}
        >
          Buy
        </Button>
      );
    }
    if (!weapon.equipped) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => equipWeapon(weapon)}
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
            <TableCell>Weapon</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Click Power</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weapons.map(weapon => (
            <TableRow key={weapon.id}>
              <TableCell component="th" scope="row">
                {weapon.name}
              </TableCell>
              <TableCell align="right">{weapon.description}</TableCell>
              <TableCell align="right">{weapon.weaponClickPower}</TableCell>
              <TableCell align="right">{weapon.cost}</TableCell>
              <TableCell align="right">
                { buildAButton(weapon) }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

WeaponsContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  coinCount: PropTypes.number.isRequired,
  addLog: PropTypes.func.isRequired,
  updateCoinCount: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  weapons: PropTypes.array.isRequired,
  buyAndEquipWeapon: PropTypes.func.isRequired,
  equipWeapon: PropTypes.func.isRequired,
};

export default withStyles(styles)(WeaponsContainer);
