import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      padding: '12px 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '14px 0',
    },
  },
  icon: {
    fontSize: 14,
    color: '#f03434',
    position: 'relative',
    top: 2,
    margin: '0 2px',
  },
  footerItemA: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  footerItemB: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
});

function Footer(props) {
  const { classes, className } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="sm">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} className={classes.footerItemA}>
            <Typography variant="caption" color="textSecondary">
              Made with <FavoriteIcon className={classes.icon} /> in Indonesia
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.footerItemB}>
            <Typography variant="caption" color="textSecondary">
              Copyright &copy; 2021{' '}
              <Link href="https://ullem.com" target="_blank">
                Ullem Undangan Digital
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(Footer);
