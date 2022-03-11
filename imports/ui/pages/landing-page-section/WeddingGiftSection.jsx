import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';

import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import { weddingGiftAccounts } from '../../../lib/variables.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(6),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: '0 24px',
  },
  card: {
    borderRadius: '8px',
    minWidth: '256px',
    textAlign: 'center',
  },
  cardHeader: {
    padding: '12px 0 12px',
    backgroundColor: theme.palette.background.default,
  },
  copyButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function WeddingGiftSection() {
  const classes = useStyles();

  const [openSnackbarCopied, setOpenSnackbarCopied] = useState(false);

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
        <Box width="100%">
          <Typography variant="body1" color="textSecondary" paragraph>
            Saudara/i yang ingin mengirim hadiah ke pernikahan kami, bisa transfer ke rekening di
            bawah
          </Typography>
        </Box>
        {/* #################### Cards #################### */}
        <Box pt={1} pb={3}>
          <Card width="100%" className={classes.card}>
            <div className={classes.cardHeader}>
              <img src="/img/logo/payment/a-logo-payment-bca.svg" alt="BCA" />
            </div>
            <Divider />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                <strong>No. Rekening {weddingGiftAccounts[0].number}</strong>
              </Typography>
              <Typography variant="body2">a/n {weddingGiftAccounts[0].owner}</Typography>
              <CopyToClipboard
                text={weddingGiftAccounts[0].number}
                onCopy={() => setOpenSnackbarCopied(true)}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.copyButton}
                  startIcon={<FileCopyOutlinedIcon />}
                >
                  Salin Nomor
                </Button>
              </CopyToClipboard>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card width="100%" className={classes.card}>
            <div className={classes.cardHeader}>
              <img src="/img/logo/payment/a-logo-payment-ovo.svg" alt="OVO" />
            </div>
            <Divider />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                <strong>No. {weddingGiftAccounts[1].number}</strong>
              </Typography>
              <Typography variant="body2">a/n {weddingGiftAccounts[1].owner}</Typography>
              <CopyToClipboard
                text={weddingGiftAccounts[1].number}
                onCopy={() => setOpenSnackbarCopied(true)}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.copyButton}
                  startIcon={<FileCopyOutlinedIcon />}
                >
                  Salin Nomor
                </Button>
              </CopyToClipboard>
            </CardContent>
          </Card>
        </Box>
      </Container>
      {/* #################### Snackbar #################### */}
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
        message="Nomor berhasil disalin"
      />
    </div>
  );
}
