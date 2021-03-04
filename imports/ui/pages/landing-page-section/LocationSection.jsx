import React from 'react';
import { Zoom } from 'react-awesome-reveal';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { reception } from '../../../api/variables.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  locationColumn: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  divider: {
    width: '90%',
    marginTop: '36px',
    marginBottom: theme.spacing(4),
  },
}));

export default function LocationSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container disableGutters maxWidth="xs">
        <iframe
          title="Location Map"
          frameBorder="0"
          allowFullScreen=""
          style={{ width: '100%', height: '62.5vh', border: 0 }}
          src={reception.mapIframe}
        />
      </Container>
      <Container maxWidth="xs">
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} className={classes.locationColumn}>
            <Typography variant="subtitle1" gutterBottom>
              Lokasi Resepsi
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              <strong>{reception.location}</strong>
            </Typography>
            <Typography variant="body2">{reception.locationMore}</Typography>
          </Grid>
          <Grid item xs={10}>
            <Zoom duration={500}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                fullWidth
                href={reception.locationUrl}
                target="_blank"
              >
                Buka Peta
              </Button>
            </Zoom>
          </Grid>
          <Divider className={classes.divider} />
        </Grid>
      </Container>
    </div>
  );
}
