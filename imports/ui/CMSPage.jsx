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
    topSection: {
        width: "100%",
        padding: "32px 0",
        backgroundColor: "#4568dc"
    },
    bottomSection: {
        padding: "24px 16px 40px"
    },
    fab: {
        position: 'fixed',
        bottom: 16,
        right: 16,
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
            recipientIdName: '',
            openSnackbar: false,
            copied: false
        };

        this.top = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
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

    scrollToTop() {
        if (this.top.current) {
            this.top.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
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
                                    value={this.state.guestName}
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
                                    value={this.state.guestId}
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