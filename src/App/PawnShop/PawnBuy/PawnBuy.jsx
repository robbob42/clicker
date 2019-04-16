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
  classes, sbcCount, addLog,
  updateSbcCount, weapons, buyAndEquipWeapon,
  equipWeapon,
}) {

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
        </TableBody>
      </Table>
    </Paper>
  );
}

WeaponsContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  sbcCount: PropTypes.number.isRequired,
  addLog: PropTypes.func.isRequired,
  updateSbcCount: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  weapons: PropTypes.object.isRequired,
  buyAndEquipWeapon: PropTypes.func.isRequired,
  equipWeapon: PropTypes.func.isRequired,
};

export default withStyles(styles)(WeaponsContainer);
