import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
  root: {
    backgroundColor: '#fafafa',
    padding: '12px 0',
    textAlign: 'center',
  },
  icon: {
    fontSize: 14,
    color: '#f03434',
    position: 'relative',
    top: 2,
    margin: '0 2px',
  },
};

function Footer(props) {
  const { classes, className } = props;
  return (
    <Box className={clsx(classes.root, className)}>
      <Typography variant="caption" color="textSecondary">
        Made with <FavoriteIcon className={classes.icon} /> by Ulem Undangan Online
      </Typography>
    </Box>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(Footer);