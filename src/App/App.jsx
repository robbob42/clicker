import React, { useState } from 'react';
import CoinContainer from './CoinContainer/CoinContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';
import StoreContainer from './StoreContainer/StoreContainer';

function App() {
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');
  const [log, updateLog] = useState([]);

  const addLog = (logItem) => {
    const logCopy = log.slice();
    logCopy.unshift(logItem)
    updateLog(logCopy);
  };

  return (
    <>
      <CoinContainer
        coinCount={coinCount}
        updateCoinCount={updateCoinCount}
        updateStory={updateStory}
        addLog={addLog}
      />
      <StoryContainer
        coinCount={coinCount}
        story={story}
      />
      <LogContainer log={log} />
      <StoreContainer coinCount={coinCount} addLog={addLog} />
    </>
  );
}

export default App;
