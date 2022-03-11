import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import { domain, whatsappMessage } from '../../lib/variables.js';

import mapRsvp from '../../lib/mapRsvp.js';
import { green } from '@mui/material/colors';

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

  return <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="mobile-recipient-detail-dialog"
      fullWidth
      fullScreen
      TransitionComponent={Transition}
      className={classes.root}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant="h6">{recipient.name}</Typography>
        <IconButton onClick={handleClose} className={classes.closeButton} size="large">
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
          {/* <ListItem>
            <ListItemText disableTypography>
              <Typography
                variant="overline"
                display="block"
                className={classes.overlineTypography}
              >
                Dengan Pasangan?
              </Typography>
              <Typography variant="body1" display="block">
                {recipient.withPartner ? 'Iya' : 'Tidak'}
              </Typography>
            </ListItemText>
          </ListItem> */}
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
  </>;
}

MobileRecipientDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRemoveRecipient: PropTypes.func,
  recipient: PropTypes.object,
};
