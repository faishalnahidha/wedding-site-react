import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Zoom } from 'react-awesome-reveal';
import Div100vh from 'react-div-100vh';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';

import { useLottie } from 'lottie-react';
import scrollDownAnimation from '../../components/lottie-files/scroll-down.json';

const Root = styled(Div100vh)(({ theme }) => ({
  padding: 0,
  zIndex: 0,
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    position: 'sticky',
    top: '0',
  },
}));

const Background = styled('div')({
  display: 'block',
  width: '100%',
  height: '100%',
  zIndex: 0,
  background: 'linear-gradient(153deg, #4568dc, #b06ab3)',
  position: 'absolute',
});

const MainIllustration = styled('img')(({ theme }) => ({
  width: 'auto',
  maxWidth: '100%',
  height: '32vh',
  [theme.breakpoints.up('sm')]: {
    height: '40vh',
  },
}));

const LottieScrollDown = () => {
  const options = {
    animationData: scrollDownAnimation,
    loop: true,
    autoplay: true,
  };

  const style = {
    width: 48,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default function IntroSection(props) {
  const { recipientName, scrollToContentSection, scrollToLocationSection } = props;

  return (
    <Root>
      <Fade triggerOnce duration={1500}>
        <Background />
      </Fade>
      <Container
        maxWidth="xs"
        sx={{
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
          zIndex: 2,
          padding: {
            xs: '16px 24px 56px',
            lg: '24px',
          },
        }}
      >
        <Box
          sx={{
            width: {
              //width breakpoint may has some use in future
              xs: '38%',
            },
          }}
        >
          <Fade triggerOnce>
            <img src="/img/logo-white.svg" alt="Wedding Logo White" style={{ width: '100%' }} />
          </Fade>
        </Box>
        <Box width="100%" textAlign="center" mt={2}>
          <Fade triggerOnce>
            <MainIllustration src="/img/illustration-intro.svg" alt="Mawar and Kumbang" />
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
                  Lihat undangan
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
                Lihat lokasi
              </Button>
            </Zoom>
          </Box>
        </Box>
      </Container>
      <Hidden lgUp>
        <Box position="absolute" bottom={1} left="calc(50% - 48px/2)" zIndex={2}>
          <Fade delay={2300}>
            <LottieScrollDown />
          </Fade>
        </Box>
      </Hidden>
    </Root>
  );
}

IntroSection.propTypes = {
  recipientName: PropTypes.string,
  scrollToContentSection: PropTypes.func,
  scrollToLocationSection: PropTypes.func,
};
