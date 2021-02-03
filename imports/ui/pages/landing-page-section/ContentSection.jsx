import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Zoom } from 'react-awesome-reveal';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import { bride, groom, akad, reception } from '../../../api/variables.js';

const styles = {
  root: {
    padding: '48px 0 0',
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    textAlign: 'center',
  },
  icon: {
    width: 40,
  },
  card: {
    borderRadius: 8,
    minWidth: 256,
    textAlign: 'center',
  },
  cardHeader: {
    fontSize: 16,
    fontFamily: 'Nunito Sans, Arial',
    backgroundColor: '#fafafa',
  },
};

function ContentSection(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Assalamu&apos;alaikum Wr. Wb.
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Bismillahirrahmannirahim
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Dengan memohon rahmat Allah SWT, kami mengundang Saudara/i untuk hadir pada acara
              resepsi pernikahan kami
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Fade direction="up">
              <div>
                <Typography variant="h5" gutterBottom color="primary">
                  <strong>{bride.name}</strong>
                </Typography>
                <Typography variant="body1">
                  Putri Bp. {bride.father} & Ibu {bride.mother}
                </Typography>
              </div>
            </Fade>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>dengan</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Fade direction="up" delay={300}>
              <div>
                <Typography variant="h5" gutterBottom color="primary">
                  <strong>{groom.name}</strong>
                </Typography>
                <Typography variant="body1">
                  Putra Bp. {groom.father} & Ibu {groom.mother}
                </Typography>
              </div>
            </Fade>
          </Grid>

          {/* ################## Cards Section ################## */}
          <Grid item xs={12}>
            <Box marginTop={3} marginBottom={3}>
              <img src="/img/icon-altar.svg" alt="Altar Icon" className={classes.icon} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Zoom triggerOnce direction="up" duration={2000} delay={500}>
              <Card raised width="100%" className={classes.card}>
                <CardHeader title="Akad Nikah" disableTypography className={classes.cardHeader} />
                <Divider />
                <CardContent>
                  <Typography variant="subtitle1">
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
                      Lihat peta
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
          <Grid item xs={12}>
            <Zoom triggerOnce direction="up" duration={2000} delay={800}>
              <Card raised width="100%" className={classes.card}>
                <CardHeader title="Resepsi" disableTypography className={classes.cardHeader} />
                <Divider />
                <CardContent>
                  <Typography variant="h6">
                    <strong>{reception.date}</strong>
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
              </Card>
            </Zoom>
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={3} marginBottom={4}>
              <img src="/img/icon-location.svg" alt="Location Icon" className={classes.icon} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

ContentSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentSection);
