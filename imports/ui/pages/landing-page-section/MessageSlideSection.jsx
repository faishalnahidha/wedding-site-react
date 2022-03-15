import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Carousel from 'react-material-ui-carousel';

import QuotesIcon from '../../components/icons/QuotesIcon.jsx';
import { RecipientsCollection } from '../../../db/RecipientsCollection.js';

const CarouselItemContainer = styled('div')({
  width: '100%',
  minHeight: '176px',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'no-wrap',
  justifyContent: 'center',
});

const StyledSkeleton = styled(Skeleton)({
  marginLeft: 'auto',
  marginRight: 'auto',
});

function CarouselItem(props) {
  return (
    <CarouselItemContainer>
      <Typography
        align="center"
        sx={{
          marginBottom: 2,
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: '28px',
          letterSpacing: '0.15px',
          color: 'text.secondary',
        }}
      >
        &ldquo;{props.item.message}&rdquo;
      </Typography>
      <Typography variant="body1" align="center" color="textPrimary">
        {props.item.name}
      </Typography>
    </CarouselItemContainer>
  );
}

function CarouselItemLoading() {
  return (
    <CarouselItemContainer>
      <Typography variant="h6" align="center" color="textSecondary">
        <StyledSkeleton width="90%" />
        <StyledSkeleton width="90%" />
        <StyledSkeleton width="90%" />
      </Typography>
      <Typography variant="body2" align="center">
        <StyledSkeleton width="30%" />
      </Typography>
    </CarouselItemContainer>
  );
}

export default function MessageSlideSection() {
  const { latestMessages, isLoading } = useTracker(() => {
    const noDataAvailable = { item: [] };

    const handler = Meteor.subscribe('recipients.latestMessages');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const latestMessages = RecipientsCollection.find(
      { message: { $exists: true } },
      { sort: { name: 1 } }
    ).fetch();

    return { latestMessages };
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        paddingTop: 1,
        paddingBottom: 5,
        paddingX: 3,
        flexGrow: 1,
        bgcolor: 'background.paper',
        textAlign: 'center',
      }}
    >
      <Box marginBottom={3} textAlign="center">
        <QuotesIcon style={{ width: '40px', height: '40px' }} />
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
  );
}
