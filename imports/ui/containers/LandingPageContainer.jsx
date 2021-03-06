import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { RecipientsCollection } from '../../db/RecipientsCollection.js';

import LandingPage from '../pages/LandingPage.jsx';

export default withTracker(({ match }) => {
  const { id } = match.params;

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

  /* if (recipient !== undefined) {
        console.log('recipient: ' + recipient.name);
    } */

  return {
    isLoading,
    recipient,
    recipientExists,
  };
})(LandingPage);
