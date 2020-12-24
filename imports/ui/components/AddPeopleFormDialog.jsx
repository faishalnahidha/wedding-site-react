import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    inputForm: {
        marginBottom: "24px"
    },
    dialogAction: {
        padding: "16px 24px"
    }
};

class AddPeopleFormDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipientId: '',
            recipientName: '',
            open: false,
            setOpen: false,
            openSnackbar: false
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    handleChange(event) {
        const { value, id } = event.target;
        this.setState({ [id]: value, })
    }

    handleSubmit(event) {
        event.preventDefault();

        const recId = this.state.recipientId.trim().toLowerCase();
        const recName = this.state.recipientName.trim();

        Meteor.call('recipients.insert', recId, recName);

        this.setState({
            recipientId: '',
            recipientName: '',
            openSnackbar: true
        });

        this.handleClose();
    }

    // handleClickOpen = () => {
    //     setOpen(true);
    // };

    // handleClose = () => {
    //     setOpen(false);
    // };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Tambah Undangan
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">Tambah Undangan</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="recipientName"
                            type="text"
                            value={this.state.recipientName}
                            onChange={this.handleChange}
                            label="Nama Penerima"
                            placeholder="contoh: Lisa Mayer"
                            variant="outlined"
                            fullWidth required autoFocus
                            color="primary"
                            className={classes.inputForm}
                        />
                        <TextField
                            id="recipientId"
                            type="text"
                            value={this.state.recipientId}
                            onChange={this.handleChange}
                            label="ID Undangan"
                            placeholder="contoh: lisa-mayer"
                            helperText="Tidak boleh ada spasi"
                            variant="outlined"
                            fullWidth required
                            color="primary"
                        />
                        {/* <Button
                            type="submit"
                            value="Submit"`
                            variant="contained"
                            color="secondary"
                        //className={classes.inputForm}
                        >
                            Tambah Undangan
                        </Button> */}
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Button onClick={this.handleClose} color="primary">
                            Batal
                    </Button>
                        <Button onClick={this.handleSubmit} color="primary" variant="contained" disableElevation>
                            Tambah
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddPeopleFormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPeopleFormDialog);
