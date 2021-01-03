import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openSnackbarError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    Meteor.loginWithPassword(username, password);
  };

  handleChange = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    const { classes } = this.props;

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
                value={this.state.username}
                onChange={this.handleChange}
                label="Username"
                variant="outlined"
                fullWidth
                className={classes.inputForm}
              />

              <TextField
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                fullWidth
                required
                className={classes.inputForm}
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
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
