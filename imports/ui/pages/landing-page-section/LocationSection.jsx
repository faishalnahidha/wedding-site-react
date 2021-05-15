import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { use100vh } from 'react-div-100vh';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { reception } from '../../../lib/variables.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(5),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: 'center',
    padding: '16px 24px 0',
  },
}));

export default function LocationSection() {
  const classes = useStyles();
  const height100 = use100vh();
  const height62 = height100 ? height100 * 0.62 : '62vh';

  return (
    <div className={classes.root}>
      <Container disableGutters maxWidth="xs">
        <Box width="100%" height={height62}>
          <iframe
            title="Location Map"
            frameBorder="0"
            allowFullScreen=""
            style={{ width: '100%', height: '100%', border: 0 }}
            loading="lazy"
            src={reception.mapIframe}
          />
        </Box>
      </Container>
      <Container maxWidth="xs" className={classes.container}>
        <Box width="100%">
          <Typography variant="subtitle1" color="textPrimary" gutterBottom>
            Lokasi Resepsi
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {reception.location}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {reception.locationMore}
          </Typography>
        </Box>
        <Box width="100%" px={1} mt={3}>
          <Zoom duration={500}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disableElevation
              fullWidth
              href={reception.locationUrl}
              target="_blank"
            >
              Buka Peta
            </Button>
          </Zoom>
        </Box>
      </Container>
    </div>
  );
}
