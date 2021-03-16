import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Carousel from 'react-material-ui-carousel';

import QuotesIcon from '../../components/icons/QuotesIcon.jsx';
import { RecipientsCollection } from '../../../db/RecipientsCollection.js';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  carouselItem: {
    width: '100%',
    minHeight: '176px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    justifyContent: 'center',
  },
  messageText: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  skeleton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function CarouselItem(props) {
  const classes = useStyles();
  return (
    <div className={classes.carouselItem}>
      <Typography variant="h6" align="center" color="textSecondary" className={classes.messageText}>
        "{props.item.message}"
      </Typography>
      <Typography variant="body2" align="center">
        {props.item.name}
      </Typography>
    </div>
  );
}

function CarouselItemLoading() {
  const classes = useStyles();
  return (
    <div className={classes.carouselItem}>
      <Typography variant="h6" align="center" color="textSecondary" className={classes.messageText}>
        <Skeleton width="90%" className={classes.skeleton} />
        <Skeleton width="90%" className={classes.skeleton} />
        <Skeleton width="90%" className={classes.skeleton} />
      </Typography>
      <Typography variant="body2" align="center">
        <Skeleton width="30%" className={classes.skeleton} />
      </Typography>
    </div>
  );
}

export default function MessageSlideSection(props) {
  const { latestMessages, isLoading } = useTracker(() => {
    const noDataAvailable = { item: [] };

    const handler = Meteor.subscribe('recipients.latestMessages');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const latestMessages = RecipientsCollection.find({}, { sort: { name: 1 } }).fetch();

    return { latestMessages };
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Box marginBottom={4} textAlign="center">
          <QuotesIcon className={classes.icon} />
        </Box>
        {isLoading ? (
          <CarouselItemLoading />
        ) : (
          <Carousel
            interval={5000}
            swipe={true}
            animation="slide"
            navButtonsAlwaysInvisible
            indicatorIconButtonProps={{
              style: {
                padding: '2px',
                color: 'rgba(33, 37, 41, 0.15)',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: 'rgba(33, 37, 41, 0.6)',
              },
            }}
          >
            {latestMessages.map((item, i) => (
              <CarouselItem key={i} item={item} />
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
}
