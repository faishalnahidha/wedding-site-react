import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import AltarIcon from '../../components/icons/AltarIcon.jsx';
import WeddingLocationIcon from '../../components/icons/WeddingLocationIcon.jsx';

import { bride, groom, akad, reception } from '../../../lib/variables.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: 'center',
    padding: '0 24px',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  card: {
    borderRadius: '8px',
    minWidth: '256px',
    textAlign: 'center',
  },
  cardHeader: {
    fontSize: 16,
    fontFamily: 'Nunito Sans, Arial',
    backgroundColor: theme.palette.background.default,
  },
}));

export default function ContentSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
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
                <Typography variant="h5" color="primary" gutterBottom>
                  {bride.name}
                </Typography>
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
            <Fade direction="up" delay={300}>
              <div>
                <Typography variant="h5" color="primary" gutterBottom>
                  {groom.name}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Putra Bp. {groom.father} & Ibu {groom.mother}
                </Typography>
              </div>
            </Fade>
          </Box>
        </Box>

        {/* ####################### Cards Section ####################### */}

        <Box py={3}>
          <AltarIcon className={classes.icon} />
        </Box>

        <Box py={3}>
          <Zoom triggerOnce direction="up" duration={1500} delay={500}>
            <Card raised width="100%" className={classes.card}>
              <CardHeader title="Akad Nikah" disableTypography className={classes.cardHeader} />
              <Divider />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>{akad.date}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  pukul {akad.time}
                </Typography>
                <Typography variant="body1">
                  di {akad.location}
                  <br />
                  {akad.locationMore}.&nbsp;
                  <Link href={akad.locationUrl} target="_blank" color="secondary">
                    Lihat peta
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Box>
        <Box pb={3}>
          <Zoom triggerOnce direction="up" duration={1500} delay={800}>
            <Card raised width="100%" className={classes.card}>
              <CardHeader title="Resepsi" disableTypography className={classes.cardHeader} />
              <Divider />
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {reception.date}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  pukul {reception.time}
                </Typography>
                <Typography variant="body1">
                  di {reception.location}
                  <br />
                  {reception.locationMore}
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Box>
        <Box pt={3}>
          <WeddingLocationIcon className={classes.icon} />
        </Box>
      </Container>
    </div>
  );
}
