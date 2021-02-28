import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactTitle } from 'react-meta-tags';

import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import MuiAlert from '@material-ui/lab/Alert';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import { domain, whatsappMessage } from '../../api/variables.js';
import mapRsvp from '../../lib/mapRsvp.js';

import BackToTopButton from '../components/BackToTopButton.jsx';
import AddInvitationDialog from '../components/AddInvitationDialog.jsx';
import DesktopRecipientMessageDialog from '../components/DesktopRecipientMessageDialog.jsx';
import Login from './Login.jsx';
import MobileRecipientDetailDialog from '../components/MobileRecipientDetailDialog.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
  },
  table: {
    padding: 0,
  },
  tableToolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: 0,
  },
  mainSection: {
    padding: '16px 8px 48px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 56px',
      backgroundColor: theme.palette.background.paper,
    },
  },
  extendedIcon: {
    marginRight: '8px',
  },
  fabAdd: {
    position: 'fixed',
    zIndex: 1200,
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(3),
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      top: theme.spacing(5),
      left: theme.spacing(2),
      margin: '0',
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(5),
      left: '15%',
    },
  },
  fabBackToTop: {
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(10),
    },
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(10),
    },
  },
  toolbar: {
    padding: '0 4px 0 52px',
  },
  appbar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(10),
    },
  },
  paper: {
    padding: '16px 24px 40px',
  },
  logo: {
    height: '36px',
    [theme.breakpoints.down('xs')]: {
      height: '32px',
    },
  },
}));

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

export default function CMS(props) {
  const [openSnackbarAddSuccess, setOpenSnackbarAddSuccess] = useState(false);
  const [openSnackbarCopied, setOpenSnackbarCopied] = useState(false);
  const [openSnackbarRemoved, setOpenSnackbarRemoved] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDesktopRecipientMessage, setOpenDesktopRecipientMessage] = useState(false);
  const [openMobileRecipientDetail, setOpenMobileRecipientDetail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowAnchorEl, setSelectedRowAnchorEl] = useState(null);
  const [selectedRowRecipient, setSelectedRowRecipient] = useState(null);

  /* Handle open and close desktop add invitation dialog */
  const handleOpenAddInvitationDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddInvitationDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenSnackbarAddSuccess = () => {
    setOpenSnackbarAddSuccess(true);
  };

  /* Handle menu in toolbar */
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    Meteor.logout();
  };

  /* Handle more option in recipient row */
  const handleMoreOptionClick = (event, recipient) => {
    setSelectedRowAnchorEl(event.currentTarget);
    setSelectedRowRecipient(recipient);
  };

  const handleMoreOptionClose = () => {
    setSelectedRowAnchorEl(null);
  };

  /* Handle open and close desktop recipient message dialog */
  const handleOpenDesktopRecipientMessage = () => {
    setOpenDesktopRecipientMessage(true);
    handleMoreOptionClose();
  };

  const handleCloseDesktopRecipientMessage = () => {
    setOpenDesktopRecipientMessage(false);
  };

  /* Handle open and close mobile recipient detail dialog */
  const handleOpenMobileRecipientDetail = (recipient) => {
    setSelectedRowRecipient(recipient);
    setOpenMobileRecipientDetail(true);
  };

  const handleCloseMobileRecipientDetail = () => {
    setOpenMobileRecipientDetail(false);
  };

  const handleRemoveRecipient = () => {
    handleMoreOptionClose();
    handleCloseMobileRecipientDetail();
    Meteor.call('recipients.remove', selectedRowRecipient._id);
    setOpenSnackbarRemoved(true);
  };

  const { loading, user, recipients } = props;
  const classes = useStyles();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      {/* If user logged in (not null), render CMS. If user not logged in (null), route to Login Page */}
      {user !== null ? (
        <>
          <ReactTitle title="Ulem Invitation Management System" />
          <div className={classes.root} id="CMSPage">
            <ElevationScroll {...props}>
              <AppBar position="sticky" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                  <img
                    src="/img/logo-ullem-ims.svg"
                    alt="Ullem IMS Logo"
                    className={[classes.logo, classes.title].join(' ')}
                  />
                  <IconButton
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    size="medium"
                    color="inherit"
                  >
                    <MoreVertOutlinedIcon fontSize="default" />
                  </IconButton>

                  {/* ########  APP BAR MORE OPTIONS ######## */}
                  <Menu
                    id="toolbar-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
            </ElevationScroll>

            <Container maxWidth="md" className={classes.mainSection}>
              {isMobile ? (
                /* ########################################  LIST START  ######################################## */
                <List
                  aria-label="recipient list"
                  // subheader={<ListSubheader component="div">Daftar Undangan</ListSubheader>}
                >
                  {recipients.map((recipient) => (
                    <ListItem
                      button
                      key={recipient._id}
                      onClick={() => handleOpenMobileRecipientDetail(recipient)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PersonRoundedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={recipient.name}
                        secondary={recipient.rsvp && mapRsvp(recipient.rsvp)}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                /* ########################################  TABLE START  ######################################## */
                <Paper variant="outlined" className={classes.paper}>
                  {/* <Toolbar className={classes.tableToolbar}>
                    <Typography variant="h6" align="left" className={classes.title}>
                      Daftar Undangan
                    </Typography>
                  </Toolbar> */}
                  <TableContainer className={classes.table}>
                    <Table aria-label="recipient-table">
                      {/* ###############################  TABLE HEADER  ################################### */}
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell>
                            <strong>Nama</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Link Undangan</strong>
                          </TableCell>
                          <TableCell>
                            <strong>RSVP</strong>
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* ############################  RENDER TABLE ROW  ############################### */}
                        {recipients.map((recipient) => (
                          <TableRow key={recipient._id}>
                            <TableCell>{recipient.name}</TableCell>
                            <TableCell>
                              <Link href={`http://${domain}${recipient._id}`} target="_blank">
                                {domain}
                                {recipient._id}
                              </Link>
                            </TableCell>
                            <TableCell>{mapRsvp(recipient.rsvp)}</TableCell>
                            <TableCell padding="none" align="right">
                              <Tooltip title="Share via WhatsApp">
                                <IconButton
                                  href={`https://api.whatsapp.com/send?text=${whatsappMessage}${recipient._id}`}
                                  target="_blank"
                                >
                                  <WhatsAppIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Copy Link">
                                <CopyToClipboard
                                  text={`http://${domain}${recipient._id}`}
                                  onCopy={() => setOpenSnackbarCopied(true)}
                                >
                                  <IconButton>
                                    <FileCopyOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </CopyToClipboard>
                              </Tooltip>
                              <IconButton
                                size="medium"
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={(e) => handleMoreOptionClick(e, recipient)}
                              >
                                <MoreVertOutlinedIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </Container>

            {/* ##################################  SELECTED ROW MORE OPTIONS ################################## */}
            <Menu
              id="row-menu"
              anchorEl={selectedRowAnchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              open={Boolean(selectedRowAnchorEl)}
              onClose={handleMoreOptionClose}
            >
              <MenuItem onClick={handleOpenDesktopRecipientMessage}>Lihat Pesan</MenuItem>
              <MenuItem onClick={handleRemoveRecipient}>Hapus</MenuItem>
            </Menu>

            {selectedRowRecipient && (
              <>
                <DesktopRecipientMessageDialog
                  open={openDesktopRecipientMessage}
                  handleClose={handleCloseDesktopRecipientMessage}
                  recipientName={selectedRowRecipient.name}
                  recipientMessage={selectedRowRecipient.message}
                />
                <MobileRecipientDetailDialog
                  open={openMobileRecipientDetail}
                  handleClose={handleCloseMobileRecipientDetail}
                  handleRemoveRecipient={handleRemoveRecipient}
                  recipient={selectedRowRecipient}
                />
              </>
            )}

            {/* ########################################  FAB  ######################################## */}
            <BackToTopButton className={classes.fabBackToTop} />
            <Zoom in timeout={500} style={{ transitionDelay: '500ms' }}>
              <Fab
                onClick={handleOpenAddInvitationDialog}
                variant="extended"
                color="primary"
                className={classes.fabAdd}
              >
                <AddOutlinedIcon className={classes.extendedIcon} />
                Tambah Undangan
              </Fab>
            </Zoom>
            {/* <Hidden xsDown>
              <Zoom in timeout={500} style={{ transitionDelay: '500ms' }}>
                <Fab
                  onClick={handleOpenAddInvitationDialog}
                  color="primary"
                  className={classes.fabAdd}
                >
                  <AddOutlinedIcon />
                </Fab>
              </Zoom>
            </Hidden> */}
            <AddInvitationDialog
              open={openAddDialog}
              handleClose={handleCloseAddInvitationDialog}
              handleSnackbarAdd={handleOpenSnackbarAddSuccess}
            />

            {/* ########################################  SNACKBAR  ######################################## */}
            <Snackbar
              key="add-success"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              className={classes.snackbar}
              open={openSnackbarAddSuccess}
              autoHideDuration={3000}
              onClose={() => setOpenSnackbarAddSuccess(false)}
            >
              <Alert onClose={() => setOpenSnackbarAddSuccess(false)} severity="success">
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
              autoHideDuration={2000}
              onClose={() => setOpenSnackbarCopied(false)}
              message="Link berhasil di-copy"
            />
            <Snackbar
              key="removed"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              className={classes.snackbar}
              open={openSnackbarRemoved}
              autoHideDuration={3000}
              onClose={() => setOpenSnackbarRemoved(false)}
              message={
                selectedRowRecipient && `Undangan ${selectedRowRecipient.name} telah dihapus!`
              }
            />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

CMS.propTypes = {
  user: PropTypes.object,
  recipients: PropTypes.array,
  loading: PropTypes.bool,
};
