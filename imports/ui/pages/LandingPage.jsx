import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import IntroSection from './landing-page-section/IntroSection.jsx';
import ContentSection from './landing-page-section/ContentSection.jsx';
import LocationSection from './landing-page-section/LocationSection.jsx';
import InputFormSection from './landing-page-section/InputFormSection.jsx';
import GallerySection from './landing-page-section/GallerySection.jsx';
import ErrorPage from './ErrorPage.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage(props) {
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

  const { loading, recipient, recipientExists } = props;

  if (loading) {
    return <LinearProgress />;
  }

  if (!recipientExists) {
    return <ErrorPage />;
  }

  return (
    <>
      <IntroSection
        recipientName={recipient.name}
        scrollToContentSection={scrollToContentSection}
        scrollToLocationSection={scrollToLocationSection}
      />
      <div ref={contentSectionRef}>
        {/* put Component inside div to make ref worked! */}
        <ContentSection />
      </div>
      <div ref={locationSectionRef}>
        <LocationSection />
      </div>
      <GallerySection />
      <InputFormSection recipient={recipient} />
      <Footer />
      <BackToTopButton />
    </>
  );
}

LandingPage.propTypes = {
  loading: PropTypes.bool,
  recipient: PropTypes.object,
  recipientExists: PropTypes.bool,
};
