import { Meteor } from 'meteor/meteor';
import { withTracker, useTracker } from 'meteor/react-meteor-data';

/* import collection api */
import { RecipientsCollection } from '../../db/RecipientsCollection.js';

import CMS from '../pages/CMS.jsx';

export default withTracker(() => {
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return { user: null };
  }

  const handler = Meteor.subscribe('recipients');

  const isLoading = !handler.ready();
  const recipients = RecipientsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  const recipientsCount = RecipientsCollection.find({}).count();

  return {
    user,
    isLoading,
    recipients,
    recipientsCount,
  };
})(CMS);
