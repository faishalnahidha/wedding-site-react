import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

const styles = (theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

function BackToTop(props) {
  const { classes, className, ...other } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 600,
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
      <div
        onClick={handleClick}
        role="presentation"
        className={clsx(classes.root, className)}
        {...other}
      >
        <Fab color="default" size="small">
          <KeyboardArrowUpRoundedIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

BackToTop.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(BackToTop);
