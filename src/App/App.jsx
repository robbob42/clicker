import React, { useState, useEffect } from 'react';
import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';
import WeaponsContainer from './WeaponsContainer/WeaponsContainer';
import useInterval from '../hooks/useInterval';

function App() {
  const [totalClicks, updateTotalClicks] = useState(0);
  const [clickPower, updateClickPower] = useState(1);
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');
  const [log, updateLog] = useState([]);
  const [weapons, updateWeapons] = useState([]);
  const [secondsPlayed, updateSecondsPlayed] = useState(0);
  const [autoCoinAmount, updateAutoCoinAmount] = useState(1);
  const [autoCoinWaitSeconds, updateAutoCoinWaitSeconds] = useState(5);
  const [secondsTillAutoCoin, updateSecondsTillAutoCoin] = useState(0);

  const addLog = (logItem) => {
    const logCopy = log.slice();
    const nextId = log.length + 1;
    logCopy.unshift({ id: nextId, logItem });
    updateLog(logCopy);
  };

  const equipWeapon = (weapon) => {
    const weaponCopy = weapons.map((compareWeapon) => {
      if (weapon.id === compareWeapon.id) {
        return (
          { ...compareWeapon, equipped: true }
        );
      }
      return (
        { ...compareWeapon, equipped: false }
      );
    });
    updateClickPower(weapon.weaponClickPower);
    updateWeapons(weaponCopy);
  };

  const buyAndEquipWeapon = (weapon) => {
    const weaponCopy = weapons.map((compareWeapon) => {
      if (weapon.id === compareWeapon.id) {
        return (
          { ...compareWeapon, owned: true, equipped: true }
        );
      }
      return (
        { ...compareWeapon, equipped: false }
      );
    });
    updateClickPower(weapon.weaponClickPower);
    updateWeapons(weaponCopy);
  };

  useEffect(() => {
    // Initialize store weapons
    let id = 0;
    function createData(name, description, weaponClickPower, cost, owned, equipped) {
      id += 1;
      return {
        id, name, description, weaponClickPower, cost, owned, equipped,
      };
    }
    const rows = [
      createData('Fist', 'The thumb goes on the outside!', 1, 0, true, true),
      createData('Stick', 'It\'s brown and sticky', 2, 10, false, false),
      createData('Rusty Shovel', 'Well, it\'s better than a stick', 5, 200, false, false),
      createData('Push Lawn Mower', 'PUSH!', 10, 500, false, false),
      createData('Tractor', 'Where\'s my tractor?', 25, 1000, false, false),
      createData('Chuck Norris', 'Of course', 1000, 100000, false, false),
    ];
    updateWeapons(rows);
  }, []);

  // Initialize timer
  useInterval(() => {
    const nextSecond = secondsPlayed + 1;
    updateSecondsPlayed(nextSecond);

    if (secondsTillAutoCoin === 0) {
      updateCoinCount(coinCount + autoCoinAmount);
    }

    updateSecondsTillAutoCoin(nextSecond % autoCoinWaitSeconds);
  }, 1000);

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
    </>
  );
}

export default App;
