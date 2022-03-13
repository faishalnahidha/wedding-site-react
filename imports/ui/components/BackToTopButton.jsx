import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import makeStyles from '@mui/styles/makeStyles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

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

BackToTop.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
};
