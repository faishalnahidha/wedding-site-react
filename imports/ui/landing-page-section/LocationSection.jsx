import React from 'react';
import PropTypes from 'prop-types';
import { Zoom, AttentionSeeker } from 'react-awesome-reveal';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { reception } from '../../api/invitationVariables.js';

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  locationColumn: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  divider: {
    width: '90%',
    margin: '36px 0',
  },
  logoGradient: {
    width: '100%',
  },
});

function LocationSection(props) {
  const { classes } = props;

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
          <Grid item xs={5}>
            <AttentionSeeker effect="pulse" delay={1000}>
              <img
                src="/img/logo-gradient.svg"
                alt="Wedding Logo Gradient"
                className={classes.logoGradient}
              />
            </AttentionSeeker>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

LocationSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationSection);
