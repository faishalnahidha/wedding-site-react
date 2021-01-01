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

const styles = {
  root: {
    padding: '32px 0',
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  inputForm: {
    margin: '8px 0',
  },
  button: {
    marginTop: 8,
    width: 120,
  },
};

const rsvpOptions = [
  {
    value: '',
  },
  {
    value: 'Yes',
    text: 'Gasskeun! Saya siap meluncur ke TKP!',
  },
  {
    value: 'Maybe',
    text: 'Ok, kalau sempat saya akan hadir',
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

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { rsvpInput, messageInput } = this.state;

    const id = this.props.recipient._id;
    const rsvp = rsvpInput;
    // eslint-disable-next-line no-undefined
    const message = messageInput !== undefined ? messageInput : '';

    Meteor.call('recipients.updateRsvp', id, rsvp, message);

    this.setState({
      openSnackbar: true,
    });
  }

  render() {
    const { classes } = this.props;

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
                  value={this.state.rsvpInput}
                  onChange={this.handleChange}
                  label="Konfirmasi kedatangan"
                  variant="filled"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
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
                  value={this.state.messageInput}
                  onChange={this.handleChange}
                  label="Pesan untuk pengantin"
                  variant="filled"
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
          open={this.state.openSnackbar}
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
