import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      padding: '16px 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '22px 0',
    },
  },
  icon: {
    fontSize: 16,
    color: '#f03434',
    position: 'relative',
    top: 2,
    margin: '0 2px',
  },
  footerItemA: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'center',
    },
  },
  footerItemB: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'center',
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
          <Grid item xs={12} sm={6} lg={12} className={classes.footerItemA}>
            <Typography variant="body1" color="textSecondary">
              Made with <FavoriteIcon className={classes.icon} /> in Indonesia
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={12} className={classes.footerItemB}>
            <Typography variant="body1" color="textSecondary">
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
