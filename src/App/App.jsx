import React, { useState, useEffect } from 'react';
import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';
import StoreContainer from './StoreContainer/StoreContainer';
import useInterval from '../hooks/useInterval';

function App() {
  const [totalClicks, updateTotalClicks] = useState(0);
  const [clickPower, updateClickPower] = useState(1);
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');
  const [log, updateLog] = useState([]);
  const [items, updateItems] = useState([]);
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

  const equipItem = (item) => {
    const itemCopy = items.map((itemLine) => {
      if (item.id === itemLine.id) {
        return (
          { ...itemLine, equipped: true }
        );
      }
      return (
        { ...itemLine, equipped: false }
      );
    });
    updateClickPower(item.itemClickPower);
    updateItems(itemCopy);
  };

  const buyAndEquipItem = (item) => {
    const itemCopy = items.map((itemLine) => {
      if (item.id === itemLine.id) {
        return (
          { ...itemLine, owned: true, equipped: true }
        );
      }
      return (
        { ...itemLine, equipped: false }
      );
    });
    updateClickPower(item.itemClickPower);
    updateItems(itemCopy);
  };

  useEffect(() => {
    // Initialize store items
    let id = 0;
    function createData(name, description, itemClickPower, cost, owned, equipped) {
      id += 1;
      return {
        id, name, description, itemClickPower, cost, owned, equipped,
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
    updateItems(rows);
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
      <StoreContainer
        coinCount={coinCount}
        addLog={addLog}
        updateCoinCount={updateCoinCount}
        items={items}
        equipItem={equipItem}
        buyAndEquipItem={buyAndEquipItem}
      />
    </>
  );
}

export default App;
