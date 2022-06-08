import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { RecipientsCollection } from '../../db/RecipientsCollection.js';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import IntroSection from './landing-page-section/IntroSection.jsx';
import ContentSection from './landing-page-section/ContentSection.jsx';
import LocationSection from './landing-page-section/LocationSection.jsx';
import GallerySection from './landing-page-section/GallerySection.jsx';
import CovidSection from './landing-page-section/CovidSection.jsx';
import MessageSlideSection from './landing-page-section/MessageSlideSection.jsx';
import InputFormSection from './landing-page-section/InputFormSection.jsx';
import WeddingGiftSection from './landing-page-section/WeddingGiftSection.jsx';
import ErrorPage from './ErrorPage.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Footer from '../components/Footer.jsx';

/* ------- create custom hook, this function replaces LandingPage Container --------- */
const useRecipient = (id) =>
  useTracker(() => {
    /* ------- handle access from root dns --------- */
    if (id === undefined) {
      const recipient = {
        _id: '0',
        name: '(＾ω＾)',
      };
      const recipientExists = true;
      return {
        recipient,
        recipientExists,
      };
    }

    const recipientId = id.toLowerCase();
    const handler = Meteor.subscribe('recipients.one', recipientId);

    const isLoading = !handler.ready();
    const recipient = RecipientsCollection.findOne({ _id: recipientId });
    const recipientExists = !isLoading && recipient !== undefined && recipient !== null;

    return {
      isLoading,
      recipient,
      recipientExists,
    };
  }, [id]);

export default function LandingPage({ match }) {
  /* ------- ref definition --------- */
  const contentSectionRef = React.createRef();
  const locationSectionRef = React.createRef();

  const scrollToContentSection = () => {
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToLocationSection = () => {
    if (locationSectionRef.current) {
      locationSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  /* ------- call custom hook --------- */
  const { id } = match.params;
  const { isLoading, recipient, recipientExists } = useRecipient(id);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!recipientExists) {
    return <ErrorPage />;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <IntroSection
            recipientName={recipient.name}
            scrollToContentSection={scrollToContentSection}
            scrollToLocationSection={scrollToLocationSection}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <div ref={contentSectionRef}>
            {/* put Component inside div to make ref worked! */}
            <ContentSection />
          </div>
          <div ref={locationSectionRef}>
            <LocationSection />
          </div>
          <GallerySection />
          <MessageSlideSection />
          <CovidSection />
          <InputFormSection recipient={recipient} />
          <WeddingGiftSection />
          <Footer />
        </Grid>
      </Grid>
      <Box position="fixed" bottom="16px" right="16px">
        <BackToTopButton />
      </Box>
    </>
  );
}

LandingPage.propTypes = {
  loading: PropTypes.bool,
  recipient: PropTypes.object,
  recipientExists: PropTypes.bool,
};
