import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: '56px',
  },
  '& .MuiDialogContent-root': {
    padding: '16px 8px',
  },
}));

const StyledDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 3, py: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

StyledDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const OverlineTypography = styled(Typography)({
  lineHeight: '16px',
  color: 'text.secondary',
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function MobileRecipientDetailDialog(props) {
  const { open, recipient, handleClose, handleRemoveRecipient } = props;

  const link = domain + recipient._id;
  const fullLink = `https://${link}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${whatsappMessage}${recipient._id}`;

  const [openSnackbarCopied, setOpenSnackbarCopied] = useState(false);

  return (
    <>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="mobile-recipient-detail-dialog"
        fullWidth
        fullScreen
        TransitionComponent={Transition}
      >
        <StyledDialogTitle id="custom-dialog-title" onClose={handleClose}>
          {recipient.name}
        </StyledDialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText disableTypography>
                <OverlineTypography variant="overline" display="block">
                  Link Undangan
                </OverlineTypography>
                <Link href={fullLink} target="_blank" variant="body1" display="block">
                  {link}
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText disableTypography>
                <OverlineTypography variant="overline" display="block">
                  RSVP
                </OverlineTypography>
                <Typography variant="body1" display="block">
                  {recipient.rsvp ? mapRsvp(recipient.rsvp) : '-'}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText disableTypography>
                <OverlineTypography variant="overline" display="block">
                  Pesan
                </OverlineTypography>
                <Typography variant="body1" display="block">
                  {recipient.message || '-'}
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </DialogContent>
        <Box display="block" px={3} py={1}>
          <Button
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            fullWidth
            disableElevation
            href={whatsappLink}
            target="_blank"
            sx={{
              my: 1,
              backgroundColor: green[500],
              '&:hover': {
                backgroundColor: green[800],
              },
            }}
          >
            Share via WhatsApp
          </Button>
          <CopyToClipboard text={fullLink} onCopy={() => setOpenSnackbarCopied(true)}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<FileCopyOutlinedIcon />}
              fullWidth
              disableElevation
              sx={{ my: 1 }}
            >
              Salin link
            </Button>
          </CopyToClipboard>
          <Button
            size="medium"
            color="primary"
            fullWidth
            onClick={handleRemoveRecipient}
            sx={{ my: 1 }}
          >
            Hapus
          </Button>
        </Box>
      </StyledDialog>

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
