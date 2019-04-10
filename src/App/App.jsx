import React, { useState } from 'react';
import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';
import StoreContainer from './StoreContainer/StoreContainer';

function App() {
  const [totalClicks, updateTotalClicks] = useState(0);
  const [clickPower, updateClickPower] = useState(1);
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');
  const [log, updateLog] = useState([]);

  const addLog = (logItem) => {
    const logCopy = log.slice();
    const nextId = log.length + 1;
    logCopy.unshift({ id: nextId, logItem });
    updateLog(logCopy);
  };

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
      />
      <StoryContainer
        coinCount={coinCount}
        story={story}
      />
      <LogContainer log={log} />
      <StoreContainer
        coinCount={coinCount}
        addLog={addLog}
        updateClickPower={updateClickPower}
      />
    </>
  );
}

export default App;
