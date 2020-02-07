import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
import Tooltip from '@material-ui/core/Tooltip';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
        padding: "24px 16px 40px"
    },
};

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: "#7f95ff",
            main: "#4568dc",
            dark: "#003ea9",
            contrastText: "#fff"
        },
        secondary: {
            light: "#fff6ff",
            main: "#f6c3e5",
            dark: "#c392b3",
            contrastText: "#212529"
        },
    },
    typography: {
        fontFamily: "Nunito Sans, Arial",
    }
});

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
<<<<<<< HEAD
                        <IconButton size="medium">
                            <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                    </CopyToClipboard>
                </TableCell>
                <TableCell padding="none">
                    <IconButton
                        size="medium"
                        href={"https://api.whatsapp.com/send?text=Assalamu%27alaikum%20Wr.%20Wb.%0A%0AKami%20mengundang%20Bapak%2FIbuSaudara%2Fi%20untuk%20hadir%20pada%20acara%20pernikahan%20kami%0A%0A%2A%2AMutik%20Hidayati%20%26%20Faishal%20Izzan%20Nahidha%2A%2A%0A%0A%2AAkad%20Nikah%20%3A%20Sabtu%2C%2022%20Februari%202020%2A%0AWaktu%20%3A%2015.30%20WIB%0ATempat%20%3A%20Balong%20RT05%2FRW01%2C%20Kemasan%2C%20Sawit%2C%20Boyolali%0A%0A%2AResepsi%20%3A%20Minggu%2C%2023%20Februari%202020%2A%0AWaktu%20%3A%2009.00%20WIB%0ATempat%20%3A%20Gedung%20Kapujanggan%20Pengging%2C%20Bendan%2C%20Banyudono%2C%20Boyolali%0A%0AMerupakan%20kebahagiaan%20bagi%20kami%20bila%20Bapak%2FIbu%2FSaudara%2Fi%20berkenan%20hadir%20untuk%20memberikan%20doa%20restu%0A%0AWassalamu%27alaikum%20Wr.%20Wb.%0A-----------------------------%0Ahttps%3A%2F%2Fmutikizzanwedding.com%2F" + recipient._id}
                        target="_blank"
                    >
                        <WhatsAppIcon fontSize="small" />
                    </IconButton>
=======
                        <Tooltip title="Salin link">
                            <IconButton size="small">
                                <FileCopyOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </TableCell>
                <TableCell padding="none">
                    <Tooltip title="Bagikan ke Whatsapp, hanya bisa di ponsel">
                        <IconButton
                            size="small"
                            href="whatsapp://send"
                            data-text="Assalamu'alaikum Wr.Wb
                            Bismillahirrahmanirrahim
                            
                            Dengan segala hormat, kami mengundang rekan-rekan untuk hadir pada acara pernikahan kami
                            
                            *Mutik Hidayati & Faishal Izzan Nahidha*
                            
                            Akad Nikah : Sabtu, 22 Februari 2020
                            Waktu : 15.30 WIB
                            Tempat : Balong RT 05/ RW 01, Kemasan, Sawit, Boyolali
                            
                            Resepsi : Minggu, 23 Februari 2020
                            Waktu : 09.00 WIB
                            Tempat : Gedung Kapujanggan, Pengging RT 15/ RW 03, Bendan, Banyudono, Boyolali
                            
                            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila rekan-rekan berkenan hadir untuk memberikan doa restu kepada kami. 
                            
                            Wassalamu'alaikum Wr.Wb
                            "
                            data-href={"https://mutikizzanwedding.com/" + recipient._id}
                            data-action="share/whatsapp/share"
                        >
                            <WhatsAppIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
>>>>>>> master
                </TableCell>
            </TableRow >

        ))
    }

    render() {
        const { classes } = this.props;

        return (
            <div ref={this.top} className={classes.root}>
                <ElevationScroll {...this.props}>
                    <AppBar position="sticky" color="primary">
                        <Toolbar>
                            <Typography variant="h6" align="center" className={classes.title}>
                                Wedding Invitation CMS
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <div className={classes.topSection}>

                    <Container maxWidth="sm">
                        {/* #################### Form Group #################### */}
                        <form onSubmit={this.handleSubmit}>
                            <ThemeProvider theme={darkTheme}>
                                <TextField
                                    id="recipientName"
                                    type="text"
                                    value={this.state.recipientName}
                                    onChange={this.handleChange}
                                    label="Nama Penerima"
                                    placeholder="contoh: Chizuru Mizuhara"
                                    variant="filled"
                                    fullWidth required
                                    color="secondary"
                                    className={classes.inputForm} />
                                <TextField
                                    id="recipientId"
                                    type="text"
                                    value={this.state.recipientId}
                                    onChange={this.handleChange}
                                    label="ID Undangan"
                                    placeholder="contoh: chizuru-mizuhara"
                                    helperText="Tidak boleh ada spasi"
                                    variant="filled"
                                    fullWidth required
                                    color="secondary"
                                    className={classes.inputForm} />
                            </ThemeProvider>
                            <Button
                                type="submit"
                                value="Submit"
                                variant="contained"
                                color="secondary"
                                className={classes.inputForm}>
                                Tambah Undangan
                                </Button>
                        </form>
                    </Container>
                </div>
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

                <BackToTopButton />

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