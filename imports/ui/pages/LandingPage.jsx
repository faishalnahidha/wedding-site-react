import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import IntroSection from './landing-page-section/IntroSection.jsx';
import ContentSection from './landing-page-section/ContentSection.jsx';
import LocationSection from './landing-page-section/LocationSection.jsx';
import InputFormSection from './landing-page-section/InputFormSection.jsx';
import ErrorPage from './ErrorPage.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Footer from '../components/Footer.jsx';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.contentSection = React.createRef();
    this.locationSection = React.createRef();

    this.scrollToContentSection = this.scrollToContentSection.bind(this);
    this.scrollToLocationSection = this.scrollToLocationSection.bind(this);
  }

  scrollToContentSection = () => {
    if (this.contentSection.current) {
      this.contentSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  scrollToLocationSection = () => {
    if (this.locationSection.current) {
      this.locationSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  renderInputFormSection = (recipient) => {
    if (recipient._id !== 0) {
      return <InputFormSection recipient={recipient} />;
    }
    return <div style={{ backgroundColor: '#fff', width: '100%', height: '32px' }} />;
  };

  render() {
    const { loading, recipient, recipientExists } = this.props;

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
          scrollToContentSection={this.scrollToContentSection}
          scrollToLocationSection={this.scrollToLocationSection}
        />
        <div ref={this.contentSection}>
          {/* put Component inside div to make ref worked */}
          <ContentSection />
        </div>
        <div ref={this.locationSection}>
          <LocationSection />
        </div>
        {this.renderInputFormSection(recipient)}
        <Footer />
        <BackToTopButton />
      </>
    );
  }
}

LandingPage.propTypes = {
  loading: PropTypes.bool,
  recipient: PropTypes.object,
  recipientExists: PropTypes.bool,
};

export default LandingPage;
