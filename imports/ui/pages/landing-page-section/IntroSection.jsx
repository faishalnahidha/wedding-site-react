import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Zoom } from 'react-awesome-reveal';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Lottie from 'react-lottie';
import animationData from '../../components/lottie-files/scroll-down.json';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    padding: '0',
    background: '#fff',
  },
  container: {
    margin: 0,
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
  logoWhite: {
    width: '100%',
  },
  mainIllustration: {
    width: '100%',
  },
  recipientColumn: {
    color: '#fff',
  },
  background: {
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'linear-gradient(153deg, #4568dc, #b06ab3)',
    zIndex: 0,
  },
  lottieContainer: {
    display: 'block',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '100%',
    zIndex: 0,
  },
});

export default function IntroSection(props) {
  const { recipientName, scrollToContentSection, scrollToLocationSection } = props;
  const classes = useStyles();
  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={classes.root}>
      <Fade triggerOnce duration={1500}>
        <div className={classes.background} />
      </Fade>
      <Container maxWidth="xs" className={classes.container}>
        <Grid container spacing={2} direction="row" justify="center" alignItems="center">
          <Grid item xs={4}>
            <Fade triggerOnce>
              <img
                src="/img/logo-white.svg"
                alt="Wedding Logo White"
                className={classes.logoWhite}
              />
            </Fade>
          </Grid>
          <Grid item xs={10}>
            <Fade triggerOnce>
              <img
                src="/img/illustration-intro.svg"
                className={classes.mainIllustration}
                alt="Mawar and Kumbang"
              />
            </Fade>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.recipientColumn} marginBottom={1}>
              <Typography variant="body2" color="inherit" align="center">
                Kepada
              </Typography>
              <Fade direction="up" duration={700} delay={800}>
                <Typography variant="h6" color="inherit" align="center">
                  <strong>{recipientName}</strong>
                </Typography>
              </Fade>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
              <Grid item xs={10}>
                <Zoom triggerOnce delay={1500} duration={500}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    disableElevation
                    fullWidth
                    onClick={scrollToContentSection}
                  >
                    Lihat Undangan
                  </Button>
                </Zoom>
              </Grid>
              <Grid item xs={10}>
                <Zoom triggerOnce delay={1800} duration={500}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={scrollToLocationSection}
                  >
                    Lihat Lokasi
                  </Button>
                </Zoom>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.lottieContainer}>
        <Fade delay={2300}>
          <Lottie options={lottieDefaultOptions} height={48} width={48} />
        </Fade>
      </div>
    </div>
  );
}

IntroSection.propTypes = {
  recipientName: PropTypes.string,
  scrollToContentSection: PropTypes.func,
  scrollToLocationSection: PropTypes.func,
};
