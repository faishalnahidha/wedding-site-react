import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactTitle } from 'react-meta-tags';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

import Footer from './Footer.jsx'
import BackToTopButton from './components/BackToTopButton.jsx';

const styles = {
    root: {
        backgroundColor: "#fff"
    },
    title: {
        flexGrow: 1
    },
    inputForm: {
        margin: "12px 0"
    },
    table: {
        padding: "0"
    },
    tableToolbar: {
        padding: "0 16px"
    },
    topSection: {
        width: "100%",
        padding: "32px 0",
        backgroundColor: "#4568dc"
    },
    bottomSection: {
        padding: "16px 8px 40px"
    },
    extendedIcon: {
        marginRight: "8px",
    },
    fabAdd: {
        position: "fixed",
        bottom: 16,
        right: 16
    },
    toolbar: {
        padding: "0 4px 0 52px"
    }
};

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

class CMSPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientId: '',
            recipientName: '',
            openSnackbar: false,
            copied: false
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

        const recId = this.state.recipientId.trim().toLowerCase();
        const recName = this.state.recipientName.trim();

        Meteor.call('recipients.insert', recId, recName);

        this.setState({
            recipientId: '',
            recipientName: '',
            openSnackbar: true
        });

    }

    renderRecipients() {
        const { recipients } = this.props;

        return recipients.map((recipient) => (
            <TableRow key={recipient._id}>
                <TableCell>
                    {recipient.name}
                </TableCell>
                <TableCell>
                    <Link href={"https://mutikizzanwedding.com/" + recipient._id} target="_blank">
                        mutikizzanwedding.com/{recipient._id}
                    </Link>
                </TableCell>
                <TableCell padding="none">
                    <CopyToClipboard
                        text={"https://mutikizzanwedding.com/" + recipient._id}
                        onCopy={() => this.setState({ copied: true })}
                    >
                        <IconButton size="medium">
                            <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                    </CopyToClipboard>
                </TableCell>
                <TableCell padding="none">
                    <IconButton
                        size="medium"
                        href={"https://api.whatsapp.com/send?text=Assalamu%27alaikum%20Wr.%20Wb.%0A%0AKami%20mengundang%20Bapak%2FIbu%2FSaudara%2Fi%20untuk%20hadir%20pada%20acara%20pernikahan%20kami%0A%0A%2A%2AMutik%20Hidayati%20%26%20Faishal%20Izzan%20Nahidha%2A%2A%0A%0A%2AAkad%20Nikah%20%3A%20Sabtu%2C%2022%20Februari%202020%2A%0AWaktu%20%3A%2015.30%20WIB%0ATempat%20%3A%20Balong%20RT05%2FRW01%2C%20Kemasan%2C%20Sawit%2C%20Boyolali%0A%0A%2AResepsi%20%3A%20Minggu%2C%2023%20Februari%202020%2A%0AWaktu%20%3A%2009.00%20WIB%0ATempat%20%3A%20Gedung%20Kapujanggan%20Pengging%2C%20Bendan%2C%20Banyudono%2C%20Boyolali%0A%0AMerupakan%20kebahagiaan%20bagi%20kami%20bila%20Bapak%2FIbu%2FSaudara%2Fi%20berkenan%20hadir%20untuk%20memberikan%20doa%20restu%0A%0AWassalamu%27alaikum%20Wr.%20Wb.%0A-----------------------------%0Ahttps%3A%2F%2Fmutikizzanwedding.com%2F" + recipient._id}
                        target="_blank"
                    >
                        <WhatsAppIcon fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow >

        ))
    }

    render() {
        const { classes, loading } = this.props;

        if (loading) {
            return <LinearProgress />
        }

        return (
            <div ref={this.top} className={classes.root} id="CMSPage">
                <ReactTitle title="Ulem Invitation Management System" />
                <ElevationScroll {...this.props}>
                    <AppBar position="sticky" color="primary">
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" align="center" className={classes.title}>
                                Ulem IMS
                            </Typography>
                            <IconButton size="medium" color="inherit">
                                <MoreVertOutlinedIcon fontSize="default" />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>

                <Container maxWidth="sm" className={classes.bottomSection}>
                    {/* #################### Table #################### */}
                    <Toolbar className={classes.tableToolbar}>
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
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderRecipients()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Footer />

                {/* #################### FAB #################### */}
                <BackToTopButton />
                <Fab variant="extended" color="secondary" className={classes.fabAdd}>
                    <AddOutlinedIcon className={classes.extendedIcon} />
                    Tambah Undangan
                </Fab>

                {/* #################### Snackbar #################### */}
                <Snackbar
                    key="add-success"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ openSnackbar: false })}
                    message="Undangan berhasil ditambahkan!"
                />
                <Snackbar
                    key="copied"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.copied}
                    autoHideDuration={1000}
                    onClose={() => this.setState({ copied: false })}
                    message="Link disalin"
                />
            </div>
        )
    }
}

CMSPage.propTypes = {
    classes: PropTypes.object.isRequired,
    recipients: PropTypes.array,
    loading: PropTypes.bool
};

export default withStyles(styles)(CMSPage);