import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';

import MuiAlert from '@mui/material/Alert';

import Footer from '../components/Footer.jsx';
import UllemImsLogo from '../components/UllemImsLogo.jsx';

const Root = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    paddingTop: '5vh',
    paddingBottom: theme.spacing(9),
    marginBottom: -theme.spacing(9),
    backgroundColor: theme.palette.background.default,
  },
  [theme.breakpoints.up('sm')]: {
    paddingTop: '12vh',
    paddingBottom: theme.spacing(6),
    marginBottom: -theme.spacing(6),
    backgroundColor: theme.palette.grey[50],
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '64px 24px',
  [theme.breakpoints.down('sm')]: {
    border: 'none',
    padding: '24px 24px',
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        if (error.reason === 'Incorrect password') {
          setIsPasswordError(true);
        } else {
          setIsUsernameError(true);
        }

        setOpenSnackbarError(true);
        setErrorMessage(error.reason);
      }
    });
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    setIsUsernameError(false);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setIsPasswordError(false);
  };

  return (
    <>
      <Root>
        <Container maxWidth="xs" disableGutters>
          <StyledPaper variant="outlined">
            <Box display="block" textAlign="center" mb={4}>
              <UllemImsLogo style={{ width: '192px', marginBottom: '16px' }} />
              <Typography variant="subtitle1" align="center">
                Invitation Management System
              </Typography>
            </Box>

            {/* #################### Form Group #################### */}
            <form onSubmit={handleSubmit}>
              <TextField
                id="username"
                type="text"
                value={username}
                onChange={handleChangeUsername}
                label="Username"
                variant="outlined"
                fullWidth
                error={isUsernameError}
                sx={{ mb: 3 }}
              />

              <TextField
                id="password"
                type="password"
                value={password}
                onChange={handleChangePassword}
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                fullWidth
                error={isPasswordError}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                fullWidth
                required
              >
                Login
              </Button>
            </form>
          </StyledPaper>
        </Container>
        <Box position="absolute" bottom={0} width="100%" bgcolor="grey.50">
          <Footer />
        </Box>
      </Root>

      {/* #################### Snackbar #################### */}
      <Snackbar
        key="error-message"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbarError}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbarError(false)}
        sx={{
          bottom: { xs: 96, md: 24 }, // in px
        }}
      >
        <Alert onClose={() => setOpenSnackbarError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
