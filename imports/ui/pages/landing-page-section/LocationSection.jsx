import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { use100vh } from 'react-div-100vh';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { reception } from '../../../lib/variables.js';

export default function LocationSection() {
  const height100 = use100vh();
  const height62 = height100 ? height100 * 0.62 : '62vh';

  return (
    <Container
      disableGutters
      maxWidth="xs"
      sx={{
        paddingBottom: 5,
        flexGrow: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Box height={height62}>
        <iframe
          title="Location Map"
          frameBorder="0"
          allowFullScreen=""
          style={{ width: '100%', height: '100%', border: 0 }}
          loading="lazy"
          src={reception.mapIframe}
        />
      </Box>

      <Box textAlign={'center'} padding={'16px 24px 0'}>
        <Typography variant="subtitle1" color="textPrimary" gutterBottom>
          Lokasi Resepsi
        </Typography>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          <strong>{reception.location}</strong>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {reception.locationMore}
        </Typography>
      </Box>
      <Box px={6} mt={3}>
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
            Buka Google Maps
          </Button>
        </Zoom>
      </Box>
    </Container>
  );
}
