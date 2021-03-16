import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      padding: '16px 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '22px 0',
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
}));

export default function Footer(props) {
  const { className } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="sm">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} className={classes.footerItemA}>
            <Typography variant="body2" color="textSecondary">
              Made with <FavoriteIcon className={classes.icon} /> in Indonesia
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.footerItemB}>
            <Typography variant="body2" color="textSecondary">
              &copy; 2021{' '}
              <Link href="https://ullem.com" target="_blank">
                Ullem Undangan Online
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};
