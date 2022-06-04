import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { styled } from '@mui/material/styles';
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

const StyledCard = styled(Card)({
  minWidth: '256px',
  textAlign: 'center',
});

const StyledCardHeader = styled('div')(({ theme }) => ({
  padding: '12px 0 12px',
  backgroundColor: theme.palette.background.default,
}));

export default function WeddingGiftSection() {
  const [openSnackbarCopied, setOpenSnackbarCopied] = useState(false);

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          pt: 1,
          pb: 6,
          px: 3,
          flexGrow: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Box width="100%">
          <Typography variant="body1" color="textSecondary" paragraph>
            Saudara/i yang ingin mengirim hadiah ke pernikahan kami, bisa transfer ke rekening di
            bawah
          </Typography>
        </Box>
        {/* #################### Cards #################### */}
        <Box pt={1} pb={3}>
          <StyledCard width="100%">
            <StyledCardHeader>
              <img src="/img/logo/payment/a-logo-payment-bca.svg" alt="BCA" />
            </StyledCardHeader>
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
                  startIcon={<FileCopyOutlinedIcon />}
                  sx={{ mt: 2 }}
                >
                  Salin nomor
                </Button>
              </CopyToClipboard>
            </CardContent>
          </StyledCard>
        </Box>
        <Box>
          <StyledCard width="100%">
            <StyledCardHeader>
              <img src="/img/logo/payment/a-logo-payment-ovo.svg" alt="OVO" />
            </StyledCardHeader>
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
                  startIcon={<FileCopyOutlinedIcon />}
                  sx={{ mt: 2 }}
                >
                  Salin nomor
                </Button>
              </CopyToClipboard>
            </CardContent>
          </StyledCard>
        </Box>
      </Container>
      {/* #################### Snackbar #################### */}
      <Snackbar
        key="copied"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbarCopied}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbarCopied(false)}
        message="Nomor berhasil disalin"
      />
    </>
  );
}
