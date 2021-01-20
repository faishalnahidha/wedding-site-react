import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

import Footer from './components/Footer.jsx';

const styles = (theme) => ({
  root: {
    height: '100vh',
    padding: '80px 0',
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  inputForm: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 80,
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openSnackbarError: false,
      errorMessage: '',
      isUsernameError: false,
      isPasswordError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        if (error.reason === 'Incorrect password') {
          this.setState({
            isPasswordError: true,
          });
        } else {
          this.setState({
            isUsernameError: true,
          });
        }

        this.setState({
          openSnackbarError: true,
          errorMessage: error.reason,
        });
      }
    });
  };

  handleChange = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value, isUsernameError: false });
  };

  render() {
    const { classes } = this.props;
    const {
      username,
      password,
      openSnackbarError,
      errorMessage,
      isUsernameError,
      isPasswordError,
    } = this.state;

    return (
      <div className={classes.root}>
        <Container maxWidth="xs">
          <Grid container>
            <Typography variant="h5" gutterBottom align="center" className={classes.header}>
              ULEM Invitation Management System
            </Typography>
            {/* #################### Form Group #################### */}
            <form onSubmit={this.handleSubmit} className="loginForm">
              <TextField
                id="username"
                type="text"
                value={username}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                fullWidth
                required
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
          </Grid>
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
          onClose={() => this.setState({ openSnackbarError: false })}
        >
          <Alert onClose={() => this.setState({ openSnackbarError: false })} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
