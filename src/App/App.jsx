import React, { useState } from 'react';
import { Button, Typography, Paper } from '@material-ui/core';

function App() {
  const [clickCount, updateClickCount] = useState(0);

  const click = () => {
    updateClickCount(clickCount + 1);
  };

  return (
    <>
      <Paper>
        <Button
          color="primary"
          variant="contained"
          onClick={click}
        >
          Click Me!
        </Button>
        <Typography>
          {clickCount}
        </Typography>
      </Paper>
    </>
  );
}

export default App;
