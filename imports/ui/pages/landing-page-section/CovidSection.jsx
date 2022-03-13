import React from 'react';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import CovidMaskIcon from '../../components/icons/CovidMaskIcon.jsx';
import CovidNohandshakeIcon from '../../components/icons/CovidNohandshakeIcon.jsx';
import CovidSocialdistancingIcon from '../../components/icons/CovidSocialdistancingIcon.jsx';
import CovidWashinghandsIcon from '../../components/icons/CovidWashinghandsIcon.jsx';

const MyCircleIcon = styled('div')(({ theme }) => ({
  width: '56px',
  height: '56px',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  lineHeight: 1,
  flexShrink: 0,
  justifyContent: 'center',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: '1.5px',
  borderColor: theme.palette.divider,
  boxSizing: 'border-box',
  marginRight: theme.spacing(3),
}));

const iconStyle = {
  width: '32px',
  height: '32px',
};

export default function CovidSection() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        pt: 1,
        pb: 5,
        px: 3,
        flexGrow: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Divider sx={{ width: '100%', mb: 6 }} />
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Himbauan
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 2 }}>
        Karena situasi pandemi saat ini, maka tamu undangan diwajibkan mematuhi protokol kesehatan
      </Typography>
      <List>
        <ListItem disableGutters>
          <ListItemAvatar>
            <MyCircleIcon>
              <CovidMaskIcon style={iconStyle} />
            </MyCircleIcon>
          </ListItemAvatar>
          <ListItemText primary="Memakai masker" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <MyCircleIcon>
              <CovidSocialdistancingIcon style={iconStyle} />
            </MyCircleIcon>
          </ListItemAvatar>
          <ListItemText primary="Menjaga jarak" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <MyCircleIcon>
              <CovidWashinghandsIcon style={iconStyle} />
            </MyCircleIcon>
          </ListItemAvatar>
          <ListItemText primary="Menjaga kebersihan" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <MyCircleIcon>
              <CovidNohandshakeIcon style={iconStyle} />
            </MyCircleIcon>
          </ListItemAvatar>
          <ListItemText primary="Tidak berjabat tangan" />
        </ListItem>
      </List>
    </Container>
  );
}
