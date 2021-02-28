import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';

import MuiAlert from '@material-ui/lab/Alert';

import Footer from '../components/Footer.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    position: 'relative',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]: {
      paddingTop: '5vh',
      paddingBottom: theme.spacing(9),
      marginBottom: -theme.spacing(9),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: '12vh',
      paddingBottom: theme.spacing(6),
      marginBottom: -theme.spacing(6),
    },
  },
  inputForm: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  header: {
    display: 'block',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 80,
    },
  },
  paper: {
    padding: '64px 24px',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      padding: '24px 24px',
    },
  },
  logo: {
    width: '192px',
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" disableGutters>
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.header}>
            <img src="/img/logo-ullem-ims.svg" alt="Ullem IMS Logo" className={classes.logo} />
            <Typography variant="subtitle1" align="center">
              Invitation Management System
            </Typography>
          </div>

          {/* #################### Form Group #################### */}
          <form onSubmit={handleSubmit} className="loginForm">
            <TextField
              id="username"
              type="text"
              value={username}
              onChange={handleChangeUsername}
              label="Username"
              variant="outlined"
              fullWidth
              className={classes.inputForm}
              error={isUsernameError}
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
              className={classes.inputForm}
              error={isPasswordError}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              fullWidth
              required
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer className={classes.footer} />

      {/* #################### Snackbar #################### */}
      <Snackbar
        key="error-message"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        className={classes.snackbar}
        open={openSnackbarError}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbarError(false)}
      >
        <Alert onClose={() => setOpenSnackbarError(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
