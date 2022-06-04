import React from 'react';
import { use100vh } from 'react-div-100vh';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ErrorPage() {
  const height100 = use100vh();
  const height62 = height100 ? height100 * 0.62 : '62vh';

  return (
    <>
      <Container maxWidth="xs">
        <Box height={height62} position="relative">
          <Box width="100%" position="absolute" textAlign="center" bottom="16px">
            <img src="/img/a-illustration-404.svg" alt="404 page not found" />
          </Box>
        </Box>
        <Box>
          <Typography variant="body1" color="textPrimary" align="center" gutterBottom>
            Ups... ID ini tidak ada dalam daftar undangan
          </Typography>
        </Box>
        <Box mt={3} textAlign="center">
          <Button variant="contained" disableElevation color="primary" size="large" href="/">
            Ke halaman utama
          </Button>
        </Box>
      </Container>
    </>
  );
}
