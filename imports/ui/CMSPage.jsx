import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";

// import { Guests } from '../api/guests.js';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

const styles = {
    root: {
        padding: '0 0 56px',
        flexGrow: 1,
        backgroundColor: '#fafafa'
    },
    title: {
        flexGrow: 1
    },
    container: {
        paddingTop: 32
    },
    paper: {
        paddingBottom: 24
    },
    inputForm: {
        margin: "12px 0"
    },
    table: {
        padding: "0 16px"
    }
};

class CMSPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientId: '',
            recipientIdName: '',
            openSnackbar: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { value, id } = event.target;
        this.setState({ [id]: value, })
    }

    handleSubmit(event) {
        event.preventDefault();

        const recipientId = this.state.recipientId.trim().toLowerCase();
        const recipientName = this.state.recipientName.trim();

        Meteor.call('recipients.insert', recipientId, recipientName);

        this.setState({
            recipientId: '',
            recipientName: '',
            openSnackbar: true
        });
    }

    handleClose() {
        this.setState({ openSnackbar: false });
    }

    renderRecipients() {
        const { recipients } = this.props;
        return recipients.map((recipient) => (
            <TableRow key={recipient._id}>
                <TableCell>
                    {recipient.name}
                </TableCell>
                <TableCell>
                    mutikizzanwedding.com/{recipient._id}
                </TableCell>
            </TableRow>

        ))
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" align="center" className={classes.title}>
                            Wedding Invitation CMS
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm" className={classes.container}>

                    <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12}>
                            {/* #################### Form Group #################### */}
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    id="recipientName"
                                    type="text"
                                    value={this.state.guestName}
                                    onChange={this.handleChange}
                                    label="Nama Penerima"
                                    placeholder="contoh: Chizuru Mizuhara"
                                    variant="filled"
                                    fullWidth required
                                    className={classes.inputForm} />
                                <TextField
                                    id="recipientId"
                                    type="text"
                                    value={this.state.guestId}
                                    onChange={this.handleChange}
                                    label="ID Undangan"
                                    placeholder="contoh: chizuru-mizuhara"
                                    helperText="Tidak boleh ada spasi"
                                    variant="filled"
                                    fullWidth required
                                    className={classes.inputForm} />
                                <Button
                                    type="submit"
                                    value="Submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.inputForm}>
                                    Tambah Undangan
                                </Button>
                            </form>
                        </Grid>
                        <Grid item xs={12}><Divider /></Grid>

                        <Grid item xs={12}>
                            {/* #################### Table #################### */}
                            <Paper className={classes.paper}>
                                <Toolbar>
                                    <Typography variant="h6" className={classes.title}>
                                        Daftar Undangan
                                    </Typography>
                                </Toolbar>
                                <TableContainer className={classes.table}>
                                    <Table aria-label="simple table">
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell><strong>Nama</strong></TableCell>
                                                <TableCell><strong>Link Undangan</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.renderRecipients()}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
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
                    message="Undangan berhasil ditambahkan!"
                />
            </div>
        )
    }
}

CMSPage.propTypes = {
    classes: PropTypes.object.isRequired,
    recipients: PropTypes.array.isRequired
};

export default withStyles(styles)(CMSPage);