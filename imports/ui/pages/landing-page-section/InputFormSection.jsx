import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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
  container: {
    padding: '0 24px',
  },
  inputForm: {
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '120px',
  },
  logoGradient: {
    width: '100%',
  },
  divider: {
    width: '100%',
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
      <Container maxWidth="xs" className={classes.container}>
        <Divider className={classes.divider} />
        <Box width="38%" mx="auto" mb={6}>
          <AttentionSeeker effect="pulse" delay={1000}>
            <img
              src="/img/logo-gradient.svg"
              alt="Wedding Logo Gradient"
              className={classes.logoGradient}
            />
          </AttentionSeeker>
        </Box>
        {recipient._id !== '0' ? (
          <>
            <Box width="100%" mb={2}>
              <Typography variant="body1" color="textSecondary" paragraph>
                Kami sangat berbahagia jika Saudara/i bersedia menghadiri acara resepsi pernikahan
                kami
              </Typography>
            </Box>
            <Box width="100%">
              {/* #################### Form Group #################### */}
              <form onSubmit={handleSubmit}>
                <TextField
                  id="rsvpInput"
                  value={rsvpInput}
                  onChange={handleRsvpChange}
                  label="Konfirmasi kedatangan"
                  variant="outlined"
                  color="secondary"
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
                  color="secondary"
                  multiline
                  rows="3"
                  fullWidth
                  className={classes.inputForm}
                />
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  color="secondary"
                  disableElevation
                  className={classes.button}
                >
                  Kirim
                </Button>
              </form>
            </Box>
          </>
        ) : null}
      </Container>
      {/* #################### Snackbar #################### */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Pesan sudah diterima. Terima kasih!
        </Alert>
      </Snackbar>
    </div>
  );
}

InputFormSection.propTypes = {
  recipient: PropTypes.object,
};
