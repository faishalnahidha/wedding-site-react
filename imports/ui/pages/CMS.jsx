import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactTitle } from 'react-meta-tags';

/* import mui component */
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MuiAlert from '@mui/material/Alert';

/* import mui icon */
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

/* import collection api */
import { RecipientsCollection } from '../../db/RecipientsCollection.js';

/* import library api */
import { domain, whatsappMessage } from '../../lib/variables.js';
import mapRsvp from '../../lib/mapRsvp.js';

/* import custom component */
import BackToTopButton from '../components/BackToTopButton.jsx';
import AddInvitationDialog from '../components/AddInvitationDialog.jsx';
import DesktopRecipientMessageDialog from '../components/DesktopRecipientMessageDialog.jsx';
import Login from './Login.jsx';
import MobileRecipientDetailDialog from '../components/MobileRecipientDetailDialog.jsx';
import UllemImsLogo from '../components/UllemImsLogo.jsx';

/* create custom hook, these functions replaces CMS Container */
const useAccount = () =>
  useTracker(() => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    return {
      user,
      userId,
      isLoggedIn: !!userId,
    };
  }, []);

const useRecipients = () =>
  useTracker(() => {
    const handler = Meteor.subscribe('recipients');
    const isLoading = !handler.ready();
    const recipients = RecipientsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    const recipientsCount = RecipientsCollection.find({}).count();

    return {
      isLoading,
      recipients,
      recipientsCount,
    };
  }, []);

/* styling component */
const StyledUllemImsLogo = styled(UllemImsLogo)(({ theme }) => ({
  flexGrow: 1,
  height: '36px',
  [theme.breakpoints.down('sm')]: {
    height: '32px',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: '16px 8px 48px',
  minHeight: 'calc(100vh - 64px)',
  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 56px)',
    padding: '0 0 56px',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

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

  const { isLoggedIn } = useAccount();
  const { isLoading, recipients, recipientsCount } = useRecipients();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  if (!isLoggedIn) {
    return <Login />;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  /* Handle open and close desktop add invitation dialog */
  const handleOpenAddInvitationDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddInvitationDialog = () => {
    setOpenAddDialog(false);
  };

  /* Handle snackbar add success */
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

  /* Handle remove recipient node in database */
  const handleRemoveRecipient = () => {
    handleMoreOptionClose();
    handleCloseMobileRecipientDetail();
    Meteor.call('recipients.remove', selectedRowRecipient._id);
    setOpenSnackbarRemoved(true);
  };

  return (
    <>
      <ReactTitle title="Ullem Invitation Management System" />
      <Box id="root" bgcolor="grey.50">
        <ElevationScroll {...props}>
          <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <Toolbar sx={{ p: '0 4px 0 52px' }}>
              <StyledUllemImsLogo />
              <IconButton
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                size="medium"
                color="inherit"
              >
                <MoreVertOutlinedIcon />
              </IconButton>

              {/* ########  APP BAR MORE OPTIONS ######## */}
              <Menu
                id="toolbar-menu"
                anchorEl={anchorEl}
                //getContentAnchorEl={null}
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

        <StyledContainer maxWidth="md">
          {isMobile ? (
            /* ########################################  LIST START  ######################################## */
            <List
              aria-label="recipient list"
              subheader={
                <ListSubheader component="div">Daftar Undangan ({recipientsCount})</ListSubheader>
              }
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
            <Paper
              variant="outlined"
              sx={{
                p: '16px 24px 24px',
                minHeight: '400px',
              }}
            >
              <TableContainer sx={{ p: 0 }}>
                <Table aria-label="recipient-table">
                  {/* ###############################  TABLE HEADER  ################################### */}
                  <TableHead>
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
                              size="large"
                            >
                              <WhatsAppIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <CopyToClipboard
                            text={`http://${domain}${recipient._id}`}
                            onCopy={() => setOpenSnackbarCopied(true)}
                          >
                            <Tooltip title="Salin link">
                              <IconButton size="large">
                                <FileCopyOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </CopyToClipboard>
                          <IconButton
                            size="medium"
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={(e) => handleMoreOptionClick(e, recipient)}
                          >
                            <MoreHorizOutlinedIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </StyledContainer>

        {/* ##################################  SELECTED ROW MORE OPTIONS ################################## */}
        <Menu
          id="row-menu"
          anchorEl={selectedRowAnchorEl}
          // getContentAnchorEl={null}
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
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 80, sm: 88, md: 96, lg: 32, xl: 80 }, // in px
            right: { xs: 24, md: 32, xl: 80 },
          }}
        >
          <BackToTopButton />
        </Box>
        <Zoom in timeout={500} style={{ transitionDelay: '500ms' }}>
          <Fab
            onClick={handleOpenAddInvitationDialog}
            variant="extended"
            color="primary"
            sx={{
              position: 'fixed',
              zIndex: 1200,
              bottom: { xs: 16, sm: 24, md: 32, lg: 'auto' },
              top: { lg: 96 },
              right: { xs: 16, sm: 24, md: 32, lg: 'auto' },
              left: { lg: '2%', xl: '16%' },
            }}
          >
            <AddOutlinedIcon sx={{ mr: 1 }} />
            Tambah undangan
          </Fab>
        </Zoom>
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
          open={openSnackbarAddSuccess}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbarAddSuccess(false)}
          sx={{ bottom: { xs: 80, md: 24 } }}
        >
          <Alert
            onClose={() => setOpenSnackbarAddSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
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
          open={openSnackbarCopied}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbarCopied(false)}
          message="Link berhasil disalin"
          sx={{ bottom: { xs: 80, md: 24 } }}
        />
        <Snackbar
          key="removed"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openSnackbarRemoved}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbarRemoved(false)}
          message={
            selectedRowRecipient && `Undangan untuk ${selectedRowRecipient.name} telah dihapus!`
          }
          sx={{ bottom: { xs: 80, md: 24 } }}
        />
      </Box>
    </>
  );
}

CMS.propTypes = {
  user: PropTypes.object,
  recipients: PropTypes.array,
  recipientsCount: PropTypes.number,
  isLoading: PropTypes.bool,
};

// ######################################################### CMS ver1.2.1 #########################################################
