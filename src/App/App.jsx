import React, { useState } from 'react';
import {
  AppBar, Tabs, Tab, withStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import StatsContainer from './StatsContainer/StatsContainer';
import LogContainer from './LogContainer/LogContainer';
import WeaponsContainer from './WeaponsContainer/WeaponsContainer';
import MagicContainer from './MagicContainer/MagicContainer';
import PawnShop from './PawnShop/PawnShop';
import useInterval from '../hooks/useInterval';
import {
  buildWeaponStore, buildMItemStore, equipItem,
} from '../utils/items/items';

const styles = () => ({
  gridContainer: {
    direction: 'column',
  },
  mainGridItem: {
    flexGrow: 2,
    flexBasis: '66%',
  },
  sideGridItem: {
    flexBasis: '33%',
    flexGrow: 1,
  },
});

function App({ classes }) {
  const [totalClicks, updateTotalClicks] = useState(0);
  const [clickPower, updateClickPower] = useState(1);
  const [story, updateStory] = useState('You wake up.  You remember nothing.  You know nothing... except that you must click!');
  const [log, updateLog] = useState([{ id: 0, logItem: 'Click!' }]);
  const [weapons, updateWeapons] = useState(buildWeaponStore());
  const [magicItems, updateMagicItems] = useState(buildMItemStore());
  const [secondsPlayed, updateSecondsPlayed] = useState(0);
  const [autoCoinAmount, updateAutoCoinAmount] = useState(1);
  const [autoCoinWaitSeconds, updateAutoCoinWaitSeconds] = useState(20);
  const [secondsTillAutoCoin, updateSecondsTillAutoCoin] = useState(20);
  const [selectedTab, setSelectedTab] = React.useState(0);

  // Currency
  const [sbcCount, updateSbcCount] = useState(0);
  const [rockCount, updateRockCount] = useState(0);
  const [diamondCount, updateDiamondCount] = useState(0);

  const addLog = (logItem) => {
    const logCopy = log.slice();
    const nextId = log.length + 1;
    logCopy.unshift({ id: nextId, logItem });
    updateLog(logCopy);
  };

  const equipWeapon = (weapon) => {
    const updatesAry = [{ func: updateClickPower, value: weapon.weaponClickPower }];
    equipItem(weapon, updatesAry, weapons, updateWeapons, false);
  };

  const buyAndEquipWeapon = (weapon) => {
    const updatesAry = [{ func: updateClickPower, value: weapon.weaponClickPower }];
    equipItem(weapon, updatesAry, weapons, updateWeapons, true);
  };

  const equipMItem = (mItem) => {
    const updatesAry = [
      { func: updateAutoCoinWaitSeconds, value: mItem.iterationLength },
      { func: updateAutoCoinAmount, value: mItem.coinsPerIteration },
    ];
    equipItem(mItem, updatesAry, magicItems, updateMagicItems, false);
  };

  const buyAndEquipMItem = (mItem) => {
    const updatesAry = [
      { func: updateAutoCoinWaitSeconds, value: mItem.iterationLength },
      { func: updateAutoCoinAmount, value: mItem.coinsPerIteration },
    ];
    equipItem(mItem, updatesAry, magicItems, updateMagicItems, true);
  };

  const buyCurrency = (currency, amount) => {
    updateSbcCount(sbcCount - currency.sbcRatio);
    switch (currency.id) {
      case 1:
        updateSbcCount(sbcCount - currency.sbcRatio + amount);
        break;
      case 2:
        updateSbcCount(sbcCount - currency.sbcRatio);
        updateRockCount(rockCount + amount);
        break;
      case 3:
        updateSbcCount(sbcCount - currency.sbcRatio);
        updateDiamondCount(diamondCount + amount);
        break;
      default:
        break;
    }
  };

  // Initialize timer
  useInterval(() => {
    const nextSecond = secondsPlayed + 0.25;
    updateSecondsPlayed(nextSecond);

    if (secondsTillAutoCoin === 0) {
      updateSbcCount(sbcCount + autoCoinAmount);
    }

    updateSecondsTillAutoCoin(nextSecond % autoCoinWaitSeconds);
  }, 250);


  function handleChangeTab(event, newValue) {
    setSelectedTab(newValue);
  }

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.mainGridItem}>
          <AppBar position="static">
            <Tabs value={selectedTab} onChange={handleChangeTab}>
              <Tab label="Click Away" disableRipple />
              <Tab label="Weapons Shop" disableRipple />
              <Tab label="Magic Shop" disableRipple />
              <Tab label="Pawn Shop" disableRipple />
            </Tabs>
          </AppBar>
          {selectedTab === 0
            && (
              <ClickContainer
                sbcCount={sbcCount}
                updateSbcCount={updateSbcCount}
                updateStory={updateStory}
                addLog={addLog}
                totalClicks={totalClicks}
                updateTotalClicks={updateTotalClicks}
                clickPower={clickPower}
                secondsTillAutoCoin={secondsTillAutoCoin}
                autoCoinAmount={autoCoinAmount}
                secondsPlayed={secondsPlayed}
                autoCoinWaitSeconds={autoCoinWaitSeconds}
              />
            )
          }
          {selectedTab === 1
            && (
              <WeaponsContainer
                sbcCount={sbcCount}
                addLog={addLog}
                updateSbcCount={updateSbcCount}
                weapons={weapons}
                equipWeapon={equipWeapon}
                buyAndEquipWeapon={buyAndEquipWeapon}
              />
            )
          }
          {selectedTab === 2
            && (
              <MagicContainer
                sbcCount={sbcCount}
                addLog={addLog}
                updateSbcCount={updateSbcCount}
                magicItems={magicItems}
                equipMItem={equipMItem}
                buyAndEquipMItem={buyAndEquipMItem}
              />
            )
          }
          {selectedTab === 3
            && (
              <PawnShop
                addLog={addLog}
                sbcCount={sbcCount}
                updateSbcCount={updateSbcCount}
                buyCurrency={buyCurrency}
              />
            )
          }
        </Grid>
        <Grid item className={classes.sideGridItem}>
          <StatsContainer
            sbcCount={sbcCount}
            clickPower={clickPower}
            secondsTillAutoCoin={secondsTillAutoCoin}
            autoCoinAmount={autoCoinAmount}
            secondsPlayed={secondsPlayed}
            autoCoinWaitSeconds={autoCoinWaitSeconds}
            rockCount={rockCount}
            diamondCount={diamondCount}
          />
          <StoryContainer
            sbcCount={sbcCount}
            story={story}
          />
          <LogContainer log={log} />
        </Grid>
      </Grid>
    </>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
