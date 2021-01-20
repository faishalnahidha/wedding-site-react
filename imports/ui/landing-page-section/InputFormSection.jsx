import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  inputForm: {
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '120px',
  },
});

const rsvpOptions = [
  {
    value: '',
  },
  {
    value: 'Yes',
    text: 'Siap! Saya pasti akan hadir',
  },
  {
    value: 'Maybe',
    text: 'OK, kalau sempat saya akan hadir',
  },
  {
    value: 'No',
    text: 'Maaf tidak bisa hadir, saya doakan saja semoga lancar',
  },
];

class InputFormSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpInput: '',
      messageInput: '',
      openSnackbar: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { recipient } = this.props;
    const { rsvpInput, messageInput } = this.state;

    const id = recipient._id;
    const rsvp = rsvpInput;
    const message = messageInput !== undefined ? messageInput : '';

    Meteor.call('recipients.updateRsvp', id, rsvp, message);

    this.setState({
      openSnackbar: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { rsvpInput, messageInput, openSnackbar } = this.state;

    return (
      <div className={classes.root}>
        <Container maxWidth="xs">
          <Grid container spacing={1} justify="center" alignItems="flex-start">
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Kami sangat berbahagia jika Saudara/i bersedia menghadiri acara resepsi pernikahan
                kami
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* #################### Form Group #################### */}
              <form onSubmit={this.handleSubmit}>
                <TextField
                  id="rsvpInput"
                  value={rsvpInput}
                  onChange={this.handleChange}
                  label="Konfirmasi kedatangan"
                  variant="outlined"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  required
                  className={classes.inputForm}
                >
                  {rsvpOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </TextField>
                <TextField
                  id="messageInput"
                  type="text"
                  value={messageInput}
                  onChange={this.handleChange}
                  label="Pesan untuk pengantin"
                  variant="outlined"
                  multiline
                  rows="3"
                  fullWidth
                  className={classes.inputForm}
                />
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.button}
                >
                  Kirim
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
        {/* #################### Snackbar #################### */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => this.setState({ openSnackbar: false })}
          message="Pesan sudah diterima. Thank you!"
        />
      </div>
    );
  }
}

InputFormSection.propTypes = {
  classes: PropTypes.object.isRequired,
  recipient: PropTypes.object,
};

export default withStyles(styles)(InputFormSection);
