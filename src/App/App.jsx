import React, { useState } from 'react';
import ClickContainer from './CoinContainer/CoinContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';

function App() {
  const [coinCount, updateCoinCount] = useState(0);
  const [story, updateStory] = useState('');

  return (
    <>
      <ClickContainer coinCount={coinCount} updateCoinCount={updateCoinCount} />
      <StoryContainer coinCount={coinCount} story={story} updateStory={updateStory} />
      <LogContainer logItem={story} />
    </>
  );
}

export default App;
