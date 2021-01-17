import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactTitle } from 'react-meta-tags';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MuiAlert from '@material-ui/lab/Alert';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

import Footer from './components/Footer.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';
import AddInvitationFormDialog from './components/AddInvitationFormDialog.jsx';
import LoginPage from './LoginPage.jsx';

const styles = (theme) => ({
  root: {
    backgroundColor: '#ffffff',
  },
  title: {
    flexGrow: 1,
  },
  table: {
    padding: 0,
  },
  tableToolbar: {
    paddingLeft: theme.spacing(2),
  },
  topSection: {
    width: '100%',
    padding: '32px 0',
    backgroundColor: '#4568dc',
  },
  bottomSection: {
    padding: '16px 8px 40px',
  },
  extendedIcon: {
    marginRight: '8px',
  },
  fabAdd: {
    position: 'fixed',
    zIndex: 1200,
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
    [theme.breakpoints.up('xl')]: {
      bottom: theme.spacing(5),
      right: theme.spacing(10),
    },
  },
  fabBackToTop: {
    bottom: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(10),
    },
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(11),
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(13),
    },
    [theme.breakpoints.up('xl')]: {
      bottom: theme.spacing(13),
    },
  },
  toolbar: {
    padding: '0 4px 0 52px',
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(10),
    },
  },
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CMSPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbarAddSuccess: false,
      openSnackbarCopied: false,
      openAddDialog: false,
      anchorEl: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpenAddInvitationDialog = this.handleOpenAddInvitationDialog.bind(this);
    this.handleCloseAddInvitationDialog = this.handleCloseAddInvitationDialog.bind(this);
    this.handleOpenSnackbarAddSuccess = this.handleOpenSnackbarAddSuccess.bind(this);
  }

  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  handleOpenAddInvitationDialog = () => {
    this.setState({ openAddDialog: true });
  };

  handleCloseAddInvitationDialog = () => {
    this.setState({ openAddDialog: false });
  };

  handleOpenSnackbarAddSuccess = () => {
    this.setState({ openSnackbarAddSuccess: true });
  };

  openAddInvitationDialog = () => {
    const { openAddDialog } = this.state;

    if (!openAddDialog) {
      return null;
    }

    return (
      <AddInvitationFormDialog
        handleClose={this.handleCloseAddInvitationDialog}
        handleSnackbarAdd={this.handleOpenSnackbarAddSuccess}
      />
    );
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.handleMenuClose();
    Meteor.logout();
  };

  renderRecipients() {
    const { recipients } = this.props;
    /* ######### DON'T FORGET TO CHANGE DOMAIN FOR DIFFERENT PROJECTS! ######### */
    const domain = 'mawarkumbang.ulem.com';

    return recipients.map((recipient) => (
      <TableRow key={recipient._id}>
        <TableCell>{recipient.name}</TableCell>
        <TableCell>
          <Link href={`https://${domain}/${recipient._id}`} target="_blank">
            {domain}/{recipient._id}
          </Link>
        </TableCell>
        <TableCell padding="none">
          <CopyToClipboard
            text={`https://${domain}/${recipient._id}`}
            onCopy={() => this.setState({ openSnackbarCopied: true })}
          >
            <IconButton size="medium">
              <FileCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </CopyToClipboard>
        </TableCell>
        <TableCell padding="none">
          {/* ######### DON'T FORGET TO CHANGE HREF TEXT FOR DIFFERENT PROJECTS! ######### */}
          <IconButton
            size="medium"
            href={`https://api.whatsapp.com/send?text=Assalamu%27alaikum%20Wr.%20Wb.%0A%0AKami%20mengundang%20Bapak%2FIbu%2FSaudara%2Fi%20untuk%20hadir%20pada%20acara%20pernikahan%20kami%0A%0A%2A%2AMutik%20Hidayati%20%26%20Faishal%20Izzan%20Nahidha%2A%2A%0A%0A%2AAkad%20Nikah%20%3A%20Sabtu%2C%2022%20Februari%202020%2A%0AWaktu%20%3A%2015.30%20WIB%0ATempat%20%3A%20Balong%20RT05%2FRW01%2C%20Kemasan%2C%20Sawit%2C%20Boyolali%0A%0A%2AResepsi%20%3A%20Minggu%2C%2023%20Februari%202020%2A%0AWaktu%20%3A%2009.00%20WIB%0ATempat%20%3A%20Gedung%20Kapujanggan%20Pengging%2C%20Bendan%2C%20Banyudono%2C%20Boyolali%0A%0AMerupakan%20kebahagiaan%20bagi%20kami%20bila%20Bapak%2FIbu%2FSaudara%2Fi%20berkenan%20hadir%20untuk%20memberikan%20doa%20restu%0A%0AWassalamu%27alaikum%20Wr.%20Wb.%0A-----------------------------%0Ahttps%3A%2F%2Fmawarkumbang.ulem.com%2F${recipient._id}`}
            target="_blank"
          >
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { classes, loading, user } = this.props;
    const { anchorEl, openSnackbarAddSuccess, openSnackbarCopied } = this.state;

    if (loading) {
      return <LinearProgress />;
    }

    return (
      <div className="main">
        {user !== null ? (
          <>
            <div ref={this.top} className={classes.root} id="CMSPage">
              <ReactTitle title="Ulem Invitation Management System" />
              <ElevationScroll {...this.props}>
                <AppBar position="sticky" color="primary">
                  <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" align="center" className={classes.title}>
                      Ulem IMS
                    </Typography>
                    <IconButton
                      aria-controls="menu"
                      aria-haspopup="true"
                      onClick={this.handleMenuClick}
                      size="medium"
                      color="inherit"
                    >
                      <MoreVertOutlinedIcon fontSize="default" />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={this.handleMenuClose}
                    >
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Toolbar>
                </AppBar>
              </ElevationScroll>

              <Container maxWidth="sm" className={classes.bottomSection}>
                {/* #################### Table #################### */}
                <Toolbar className={classes.tableToolbar}>
                  <Typography variant="subtitle1" className={classes.title}>
                    Daftar Undangan
                  </Typography>
                </Toolbar>
                <TableContainer className={classes.table}>
                  <Table aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        <TableCell>
                          <strong>Nama</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Link Undangan</strong>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>{this.renderRecipients()}</TableBody>
                  </Table>
                </TableContainer>
              </Container>
              <Footer />

              {/* #################### FAB #################### */}
              <BackToTopButton className={classes.fabBackToTop} />
              <Fab
                onClick={this.handleOpenAddInvitationDialog}
                variant="extended"
                color="secondary"
                className={classes.fabAdd}
              >
                <AddOutlinedIcon className={classes.extendedIcon} />
                Tambah Undangan
              </Fab>
              {this.openAddInvitationDialog()}

              {/* #################### Snackbar #################### */}
              <Snackbar
                key="add-success"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                className={classes.snackbar}
                open={openSnackbarAddSuccess}
                autoHideDuration={3000}
                onClose={() => this.setState({ openSnackbarAddSuccess: false })}
              >
                <Alert
                  onClose={() => this.setState({ openSnackbarAddSuccess: false })}
                  severity="success"
                >
                  Undangan berhasil ditambahkan!
                </Alert>
              </Snackbar>
              <Snackbar
                key="copied"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                className={classes.snackbar}
                open={openSnackbarCopied}
                autoHideDuration={1000}
                onClose={() => this.setState({ openSnackbarCopied: false })}
                message="Link berhasil disalin"
              />
            </div>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    );
  }
}

CMSPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  recipients: PropTypes.array,
  loading: PropTypes.bool,
};

export default withStyles(styles)(CMSPage);
