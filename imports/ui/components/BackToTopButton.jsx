import React from 'react';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

export default function BackToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 500,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab color="default" size="small" onClick={handleClick} role="presentation">
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </Zoom>
  );
}
