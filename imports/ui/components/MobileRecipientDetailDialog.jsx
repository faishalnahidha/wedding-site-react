import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import green from '@material-ui/core/colors/green';

import { domain, whatsappMessage } from '../../lib/variables.js';
import mapRsvp from '../../lib/mapRsvp.js';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7),
  },
  dialogTitle: {
    padding: '16px 24px',
  },
  dialogContent: {
    padding: '0 8px',
  },
  dialogActions: {
    display: 'block',
    padding: '8px 24px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  overlineTypography: {
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
  actionButton: {
    margin: '8px 0',
  },
  whatsappButton: {
    color: '#FFF',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[300],
    },
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function MobileRecipientDetailDialog(props) {
  const { open, recipient, handleClose, handleRemoveRecipient } = props;
  const classes = useStyles();

  const link = domain + recipient._id;
  const fullLink = `https://${link}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${whatsappMessage}${recipient._id}`;

  const [openSnackbarCopied, setOpenSnackbarCopied] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="mobile-recipient-detail-dialog"
        fullWidth
        fullScreen
        TransitionComponent={Transition}
        className={classes.root}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Typography variant="h6">{recipient.name}</Typography>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <List>
            <ListItem>
              <ListItemText disableTypography>
                <Typography
                  variant="overline"
                  display="block"
                  className={classes.overlineTypography}
                >
                  Link Undangan
                </Typography>
                <Link href={fullLink} target="_blank" variant="body1" display="block">
                  {link}
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText disableTypography>
                <Typography
                  variant="overline"
                  display="block"
                  className={classes.overlineTypography}
                >
                  RSVP
                </Typography>
                <Typography variant="body1" display="block">
                  {recipient.rsvp ? mapRsvp(recipient.rsvp) : '-'}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText disableTypography>
                <Typography
                  variant="overline"
                  display="block"
                  className={classes.overlineTypography}
                >
                  Pesan
                </Typography>
                <Typography variant="body1" display="block">
                  {recipient.message || '-'}
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </DialogContent>
        <div className={classes.dialogActions}>
          <Button
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            className={[classes.actionButton, classes.whatsappButton].join(' ')}
            fullWidth
            disableElevation
            href={whatsappLink}
            target="_blank"
          >
            Share via WhatsApp
          </Button>
          <CopyToClipboard text={fullLink} onCopy={() => setOpenSnackbarCopied(true)}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<FileCopyOutlinedIcon />}
              className={classes.actionButton}
              fullWidth
              disableElevation
            >
              Copy Link
            </Button>
          </CopyToClipboard>
          <Button
            size="medium"
            color="primary"
            className={classes.actionButton}
            fullWidth
            onClick={handleRemoveRecipient}
          >
            Hapus
          </Button>
        </div>
      </Dialog>

      <Snackbar
        key="copied"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbarCopied}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbarCopied(false)}
        message="Link berhasil di-copy"
      />
    </>
  );
}

MobileRecipientDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRemoveRecipient: PropTypes.func,
  recipient: PropTypes.object,
};
