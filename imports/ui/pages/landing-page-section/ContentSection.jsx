import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import AltarIcon from '../../components/icons/AltarIcon.jsx';
import WeddingLocationIcon from '../../components/icons/WeddingLocationIcon.jsx';
import InstagramIcon from '../../components/icons/InstagramIcon.jsx';

import { bride, groom, akad, reception } from '../../../lib/variables.js';

const Root = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
}));

const StyledCard = styled(Card)({
  minWidth: '256px',
  textAlign: 'center',
});

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Nunito Sans, Arial',
  backgroundColor: theme.palette.background.default,
}));

const StyledInstagramIcon = styled(InstagramIcon)(({ theme }) => ({
  width: '18px',
  height: '18px',
  fill: theme.palette.primary.main,
}));

const LivestreamLogo = styled('img')(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(3),
}));

export default function ContentSection() {
  return (
    <Root>
      <Container
        maxWidth="xs"
        sx={{
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <Box pb={3}>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Assalamu&apos;alaikum Wr. Wb.
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Bismillahirrahmannirahim
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Dengan memohon rahmat Allah SWT, kami mengundang Saudara/i untuk hadir pada acara
            resepsi pernikahan kami
          </Typography>
        </Box>
        <Box py={3}>
          <Box mb={3}>
            <Fade direction="up">
              <div>
                <Typography variant="h5" color="textPrimary">
                  <strong>{bride.name}</strong>
                </Typography>
                <Button
                  href={bride.instagramUrl}
                  target="_blank"
                  color="primary"
                  startIcon={<StyledInstagramIcon />}
                >
                  {bride.instagram}
                </Button>
                <Typography variant="body1" color="textPrimary">
                  Putri Bp. {bride.father} & Ibu {bride.mother}
                </Typography>
              </div>
            </Fade>
          </Box>
          <Box mb={3}>
            <Typography variant="body2" color="textSecondary">
              dengan
            </Typography>
          </Box>
          <Box mb={3}>
            <Fade direction="up" delay={200}>
              <div>
                <Typography variant="h5" color="textPrimary">
                  <strong>{groom.name}</strong>
                </Typography>
                <Button
                  href={groom.instagramUrl}
                  target="_blank"
                  color="primary"
                  startIcon={<StyledInstagramIcon />}
                >
                  {groom.instagram}
                </Button>
                <Typography variant="body1" color="textPrimary">
                  Putra Bp. {groom.father} & Ibu {groom.mother}
                </Typography>
              </div>
            </Fade>
          </Box>
        </Box>

        {/* ####################### Cards Section ####################### */}

        <Box py={3}>
          <AltarIcon style={{ width: '40px', height: '40px' }} />
        </Box>

        {/* ############## 'Akad Nikah' Card ############## */}
        <Box py={3}>
          <Zoom triggerOnce direction="up" duration={1500} delay={200}>
            <StyledCard raised width="100%">
              <StyledCardHeader title="Akad Nikah" disableTypography />
              <Divider />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>{akad.date}</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  pukul {akad.time}
                </Typography>
                <Typography variant="body2">
                  di {akad.location}
                  <br />
                  {akad.locationMore}.&nbsp;
                  <Link href={akad.locationUrl} target="_blank" color="primary">
                    Lihat Peta
                  </Link>
                </Typography>
              </CardContent>
            </StyledCard>
          </Zoom>
        </Box>
        {/* ############## 'Resepsi' Card ############## */}
        <Box pb={3}>
          <Zoom triggerOnce direction="up" duration={1500} delay={200}>
            <StyledCard raised width="100%">
              <StyledCardHeader title="Resepsi" disableTypography />
              <Divider />
              <CardContent>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {reception.date}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  pukul {reception.time}
                </Typography>
                <Typography variant="body2">
                  di {reception.location}
                  <br />
                  {reception.locationMore}
                </Typography>
              </CardContent>
            </StyledCard>
          </Zoom>
        </Box>
        {/* ############## 'Pernikahan Virtual' Card ############## */}
        <Box pb={3}>
          <Zoom triggerOnce direction="up" duration={1500} delay={200}>
            <StyledCard width="100%">
              <StyledCardHeader title="Pernikahan Virtual" disableTypography />
              <Divider />
              <CardContent>
                <Box>
                  <LivestreamLogo
                    src="/img/logo/brand/a-logo-brand-youtube.svg"
                    alt="Youtube Logo"
                  />
                </Box>
                <Box>
                  <Button
                    href="#"
                    target="_blank"
                    variant="contained"
                    size="large"
                    color="primary"
                    disableElevation
                  >
                    Lihat Live Streaming
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Zoom>
        </Box>
        <Box pt={3}>
          <WeddingLocationIcon style={{ width: '40px', height: '40px' }} />
        </Box>
      </Container>
    </Root>
  );
}
