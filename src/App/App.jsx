import React, { useState } from 'react';

import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';
import WeaponsContainer from './WeaponsContainer/WeaponsContainer';
import MagicContainer from './MagicContainer/MagicContainer';
import useInterval from '../hooks/useInterval';
import {
  buildWeaponStore, buildMItemStore, equipItem,
} from '../utils/items/items';

function App() {
  const [totalClicks, updateTotalClicks] = useState(0);
  const [clickPower, updateClickPower] = useState(1);
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');
  const [log, updateLog] = useState([]);
  const [weapons, updateWeapons] = useState(buildWeaponStore());
  const [magicItems, updateMagicItems] = useState(buildMItemStore());
  const [secondsPlayed, updateSecondsPlayed] = useState(0);
  const [autoCoinAmount, updateAutoCoinAmount] = useState(1);
  const [autoCoinWaitSeconds, updateAutoCoinWaitSeconds] = useState(20);
  const [secondsTillAutoCoin, updateSecondsTillAutoCoin] = useState(20);

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

  // Initialize timer
  useInterval(() => {
    const nextSecond = secondsPlayed + 0.5;
    updateSecondsPlayed(nextSecond);

    if (secondsTillAutoCoin === 0) {
      updateCoinCount(coinCount + autoCoinAmount);
    }

    updateSecondsTillAutoCoin(nextSecond % autoCoinWaitSeconds);
  }, 500);

  return (
    <>
      <ClickContainer
        coinCount={coinCount}
        updateCoinCount={updateCoinCount}
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
      <StoryContainer
        coinCount={coinCount}
        story={story}
      />
      <LogContainer log={log} />
      <WeaponsContainer
        coinCount={coinCount}
        addLog={addLog}
        updateCoinCount={updateCoinCount}
        weapons={weapons}
        equipWeapon={equipWeapon}
        buyAndEquipWeapon={buyAndEquipWeapon}
      />
      <MagicContainer
        coinCount={coinCount}
        addLog={addLog}
        updateCoinCount={updateCoinCount}
        magicItems={magicItems}
        equipMItem={equipMItem}
        buyAndEquipMItem={buyAndEquipMItem}
      />
    </>
  );
}

export default App;
