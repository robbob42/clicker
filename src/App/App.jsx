import React, { useState, useEffect } from 'react';
import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';
import WeaponsContainer from './WeaponsContainer/WeaponsContainer';
import MagicContainer from './MagicContainer/MagicContainer';
import useInterval from '../hooks/useInterval';

function App() {
  const [totalClicks, updateTotalClicks] = useState(0);
  const [clickPower, updateClickPower] = useState(1);
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');
  const [log, updateLog] = useState([]);
  const [weapons, updateWeapons] = useState([]);
  const [magicItems, updateMagicItems] = useState([]);
  const [secondsPlayed, updateSecondsPlayed] = useState(0);
  const [autoCoinAmount, updateAutoCoinAmount] = useState(1);
  const [autoCoinWaitSeconds, updateAutoCoinWaitSeconds] = useState(20);
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

  const equipMItem = (mItem) => {
    const mItemCopy = magicItems.map((compareMItem) => {
      if (mItem.id === compareMItem.id) {
        return (
          { ...compareMItem, equipped: true }
        );
      }
      return (
        { ...compareMItem, equipped: false }
      );
    });
    updateAutoCoinWaitSeconds(mItem.iterationLength);
    updateAutoCoinAmount(mItem.coinsPerIteration);
    updateMagicItems(mItemCopy);
  };

  const buyAndEquipMItem = (mItem) => {
    const mItemCopy = magicItems.map((compareMItem) => {
      if (mItem.id === compareMItem.id) {
        return (
          { ...compareMItem, owned: true, equipped: true }
        );
      }
      return (
        { ...compareMItem, equipped: false }
      );
    });
    updateAutoCoinWaitSeconds(mItem.iterationLength);
    updateAutoCoinAmount(mItem.coinsPerIteration);
    updateMagicItems(mItemCopy);
  };

  useEffect(() => {
    // Initialize store weapons
    let weaponId = 0;
    function createWeaponData(name, description, weaponClickPower, cost, owned, equipped) {
      weaponId += 1;
      return {
        id: weaponId, name, description, weaponClickPower, cost, owned, equipped,
      };
    }
    const weaponsRows = [
      createWeaponData('Fist', 'The thumb goes on the outside!', 1, 0, true, true),
      createWeaponData('Stick', 'It\'s brown and sticky', 2, 10, false, false),
      createWeaponData('Rusty Shovel', 'Well, it\'s better than a stick', 5, 200, false, false),
      createWeaponData('Push Lawn Mower', 'PUSH!', 10, 500, false, false),
      createWeaponData('Tractor', 'Where\'s my tractor?', 25, 1000, false, false),
      createWeaponData('Chuck Norris', 'Of course', 1000, 100000, false, false),
    ];
    updateWeapons(weaponsRows);

    // Initialize store magical items
    let mItemId = 0;
    function createMItemData(
      name, description, iterationLength, coinsPerIteration,
      cost, owned, equipped,
    ) {
      mItemId += 1;
      return {
        id: mItemId, name, description, iterationLength, coinsPerIteration, cost, owned, equipped,
      };
    }
    const mItemRows = [
      createMItemData('Toy Wand', 'Found this in a Cracker Jack box!', 20, 1, 0, true, true),
      createMItemData('Top Hat', 'Rabbit not included', 10, 2, 10, false, false),
      createMItemData('Tarot Cards', 'Gotta collect \'em all!', 1, 1, 200, false, false),
      createMItemData('Waluigi Board', 'What do you WAAAAAAnt?', 1, 2, 500, false, false),
      createMItemData('Crystal Ball', 'Predicting the future means more coins.', 1, 5, 1000, false, false),
      createMItemData('Harry Potter', 'Accio coins!', 1, 100, 100000, false, false),
    ];
    updateMagicItems(mItemRows);
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
