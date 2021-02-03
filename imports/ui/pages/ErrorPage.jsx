import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function ErrorPage() {
  return (
    <>
      <Container maxWidth="xs">
        <Box height="62.5vh" position="relative">
          <Box
            position="absolute"
            bottom="32px"
            left="50%"
            style={{ transform: 'translateX(-50%)' }}
          >
            <img src="/img/illustration-404.svg" alt="Error Illustration" />
          </Box>
        </Box>
        <Grid container direction="column" justify="flex-start" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" align="center" gutterBottom>
              Oops… ID ini tidak ada dalam daftar undangan
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Button variant="outlined" color="primary" size="large" href="/">
              Ke halaman utama
            </Button>
          </Grid>
        </Grid>

        <Typography />
      </Container>
    </>
  );
}
