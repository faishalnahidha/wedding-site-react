import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  inputForm: {
    marginBottom: '24px',
  },
  dialogAction: {
    padding: '16px 24px',
  },
};

class AddInvitationFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipientId: '',
      recipientName: '',
      openSnackbar: false,
      isRecipientIdEmpty: false,
      isRecipientNameEmpty: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  }

  handleNameChange(event) {
    const { value } = event.target;
    this.setState({ recipientName: value, isRecipientNameEmpty: false });
  }

  handleIdChange(event) {
    const { value } = event.target;
    this.setState({ recipientId: value, isRecipientIdEmpty: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    const recId = this.state.recipientId.trim().toLowerCase();
    const recName = this.state.recipientName.trim();

    if (recName === '') {
      this.setState({ isRecipientNameEmpty: true });
    }

    if (recId === '') {
      this.setState({ isRecipientIdEmpty: true });
    }

    if (recId !== '' && recName !== '') {
      Meteor.call('recipients.insert', recId, recName);

      this.setState({
        recipientId: '',
        recipientName: '',
        openSnackbar: true,
      });

      this.props.handleSnackbarAdd();
      this.props.handleClose();
    }
  }

  render() {
    const { classes, handleClose } = this.props;

    return (
      <div>
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Tambah Undangan</DialogTitle>
          <DialogContent>
            <TextField
              id="recipientName"
              type="text"
              value={this.state.recipientName}
              onChange={this.handleNameChange}
              label="Nama Penerima"
              placeholder="contoh: Lisa Mayer"
              variant="outlined"
              fullWidth
              required
              autoFocus
              color="primary"
              className={classes.inputForm}
              error={this.state.isRecipientNameEmpty}
              helperText={this.state.isRecipientNameEmpty ? 'Wajib diisi!' : ''}
            />
            <TextField
              id="recipientId"
              type="text"
              value={this.state.recipientId}
              onChange={this.handleIdChange}
              label="ID Undangan"
              placeholder="contoh: lisa-mayer"
              variant="outlined"
              fullWidth
              required
              color="primary"
              error={this.state.isRecipientIdEmpty}
              helperText={this.state.isRecipientIdEmpty ? 'Wajib diisi!' : 'Tidak boleh ada spasi'}
            />
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button onClick={handleClose} color="primary">
              Batal
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              variant="contained"
              disableElevation
            >
              Tambah
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddInvitationFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  handleSnackbarAdd: PropTypes.func,
};

export default withStyles(styles)(AddInvitationFormDialog);
