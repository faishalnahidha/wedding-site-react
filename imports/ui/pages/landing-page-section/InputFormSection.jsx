import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';

import MuiAlert from '@material-ui/lab/Alert';

import { AttentionSeeker } from 'react-awesome-reveal';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(6),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  inputForm: {
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '120px',
  },
  logoGradient: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  divider: {
    width: 'calc(100% - 48px)',
    marginBottom: theme.spacing(6),
  },
}));

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function InputFormSection(props) {
  const [rsvpInput, setRsvpInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { recipient } = props;
  const classes = useStyles();

  const handleRsvpChange = (event) => {
    setRsvpInput(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = messageInput !== undefined ? messageInput : '';

    Meteor.call('recipients.updateRsvp', recipient._id, rsvpInput, message);

    setOpenSnackbar(true);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Grid container spacing={3} justify="center" alignItems="flex-start">
          <Divider className={classes.divider} />
          <Grid item xs={5}>
            <AttentionSeeker effect="pulse" delay={1000}>
              <img
                src="/img/logo-gradient.svg"
                alt="Wedding Logo Gradient"
                className={classes.logoGradient}
              />
            </AttentionSeeker>
          </Grid>
          {recipient._id !== '0' ? (
            <>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Kami sangat berbahagia jika Saudara/i bersedia menghadiri acara resepsi pernikahan
                  kami
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* #################### Form Group #################### */}
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="rsvpInput"
                    value={rsvpInput}
                    onChange={handleRsvpChange}
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
                    onChange={handleMessageChange}
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
            </>
          ) : null}
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
        onClose={() => setOpenSnackbar('false')}
      >
        <Alert onClose={() => setOpenSnackbar('false')} severity="success">
          Pesan sudah diterima. Terima kasih!
        </Alert>
      </Snackbar>
    </div>
  );
}

InputFormSection.propTypes = {
  recipient: PropTypes.object,
};
