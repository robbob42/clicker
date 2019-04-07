import React, { useState } from 'react';
import ClickContainer from './ClickContainer/ClickContainer';
import StoryContainer from './StoryContainer/StoryContainer';
import LogContainer from './LogContainer/LogContainer';

function App() {
  const [clickCount, updateClickCount] = useState(0);
  const [story, updateStory] = useState('');

  return (
    <>
      <ClickContainer clickCount={clickCount} updateClickCount={updateClickCount} />
      <StoryContainer clickCount={clickCount} story={story} updateStory={updateStory} />
      <LogContainer logItem={story} />
    </>
  );
}

export default App;
