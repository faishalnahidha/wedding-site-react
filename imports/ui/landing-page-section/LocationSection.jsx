import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  root: {
    padding: '12px 0',
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
          title="Google Map Gedung Kapujanggan"
          frameBorder="0"
          allowFullScreen=""
          style={{ width: '100%', height: '62.5vh', border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1977.6135990530518!2d110.67126588076933!3d-7.5501863079718365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a6b720ad2333f%3A0xd838f4a090c3d8cc!2sGedung%20Kapujanggan!5e0!3m2!1sen!2sid!4v1580576699704!5m2!1sen!2sid"
        />
      </Container>
      <Container maxWidth="xs">
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} className={classes.locationColumn}>
            <Typography variant="subtitle1" gutterBottom>
              Lokasi Resepsi
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              <strong>Gedung Kapujanggan Pengging</strong>
            </Typography>
            <Typography variant="body2">RT 15/RW 03 Bendan, Banyudono, Boyolali</Typography>
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              fullWidth
              href="https://goo.gl/maps/NVsCTR2mbXVdLXXk7"
              target="_blank"
            >
              Buka Peta
            </Button>
          </Grid>
          <Divider className={classes.divider} />
          <Grid item xs={5}>
            <img
              src="/img/logo-gradient.svg"
              alt="Mutik Izzan Wedding Logo"
              className={classes.logoGradient}
            />
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
