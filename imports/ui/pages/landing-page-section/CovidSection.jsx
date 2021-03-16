import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import CovidMaskIcon from '../../components/icons/CovidMaskIcon.jsx';
import CovidNohandshakeIcon from '../../components/icons/CovidNohandshakeIcon.jsx';
import CovidSocialdistancingIcon from '../../components/icons/CovidSocialdistancingIcon.jsx';
import CovidWashinghandsIcon from '../../components/icons/CovidWashinghandsIcon.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: 'center',
  },
  iconContainer: {
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
    borderWidth: '2px',
    borderColor: theme.palette.divider,
    boxSizing: 'border-box',
    marginRight: theme.spacing(3),
  },
  icon: {
    width: '36px',
    height: '36px',
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    width: 'calc(100% - 24px)',
    marginBottom: theme.spacing(6),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

function MyCircleIcon(props) {
  const classes = useStyles();

  return <div className={classes.iconContainer} {...props} />;
}

export default function CovidSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Divider className={classes.divider} />
        <Typography variant="h6" align="center" className={classes.text}>
          Himbauan
        </Typography>
        <Typography variant="body2" gutterBottom className={classes.text}>
          Karena situasi pandemi saat ini, maka tamu undangan diwajibkan mematuhi protokol kesehatan
        </Typography>
        <List>
          <ListItem disableGutters>
            <ListItemAvatar>
              <MyCircleIcon>
                <CovidMaskIcon className={classes.icon} />
              </MyCircleIcon>
            </ListItemAvatar>
            <ListItemText primary="Memakai masker" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <MyCircleIcon>
                <CovidSocialdistancingIcon className={classes.icon} />
              </MyCircleIcon>
            </ListItemAvatar>
            <ListItemText primary="Menjaga jarak" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <MyCircleIcon>
                <CovidWashinghandsIcon className={classes.icon} />
              </MyCircleIcon>
            </ListItemAvatar>
            <ListItemText primary="Menjaga kebersihan" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <MyCircleIcon>
                <CovidNohandshakeIcon className={classes.icon} />
              </MyCircleIcon>
            </ListItemAvatar>
            <ListItemText primary="Tidak berjabat tangan" />
          </ListItem>
        </List>
      </Container>
    </div>
  );
}
