import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Zoom } from 'react-awesome-reveal';
import Div100vh from 'react-div-100vh';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import Lottie from 'react-lottie';
import animationData from '../../components/lottie-files/scroll-down.json';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    zIndex: 0,
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: '0',
    },
  },
  container: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '16px 24px 56px',
    position: 'relative',
    zIndex: 2,
    [theme.breakpoints.up('lg')]: {
      padding: '24px',
    },
  },
  logoContainer: {
    width: '38%',
    [theme.breakpoints.up('md')]: {
      width: '38%',
    },
  },
  logoWhite: {
    width: '100%',
  },
  mainIllustration: {
    height: '32vh',
    width: 'auto',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '40vh',
    },
  },
  background: {
    display: 'block',
    width: '100%',
    height: '100%',
    zIndex: 0,
    background: 'linear-gradient(153deg, #4568dc, #b06ab3)',
    position: 'absolute',
  },
}));

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
    <Div100vh className={classes.root}>
      <Fade triggerOnce duration={1500}>
        <div className={classes.background} />
      </Fade>
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.logoContainer}>
          <Fade triggerOnce>
            <img src="/img/logo-white.svg" alt="Wedding Logo White" className={classes.logoWhite} />
          </Fade>
        </Box>
        <Box width="100%" textAlign="center" mt={2}>
          <Fade triggerOnce>
            <img
              src="/img/illustration-intro.svg"
              className={classes.mainIllustration}
              alt="Mawar and Kumbang"
            />
          </Fade>
        </Box>
        <Box width="100%" mt={2} id="bottom-group">
          <Box color="#fff" pb={1}>
            <Typography variant="body2" color="inherit" align="center" gutterBottom>
              Kepada
            </Typography>
            <Fade direction="up" duration={600} delay={800}>
              <Typography variant="h6" color="inherit" align="center">
                {recipientName}
              </Typography>
            </Fade>
          </Box>

          <Hidden lgUp>
            <Box mt={2} px={3}>
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
            </Box>
          </Hidden>
          <Box mt={2} px={3}>
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
          </Box>
        </Box>
      </Container>
      <Hidden lgUp>
        <Box position="absolute" bottom={1} left="calc(50% - 48px/2)" zIndex={2}>
          <Fade delay={2300}>
            <Lottie options={lottieDefaultOptions} height={48} width={48} />
          </Fade>
        </Box>
      </Hidden>
    </Div100vh>
  );
}

IntroSection.propTypes = {
  recipientName: PropTypes.string,
  scrollToContentSection: PropTypes.func,
  scrollToLocationSection: PropTypes.func,
};
