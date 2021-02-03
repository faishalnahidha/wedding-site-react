import { Meteor } from 'meteor/meteor';
import { withTracker, useTracker } from 'meteor/react-meteor-data';

/* import collection api */
import { Recipients } from '../../api/recipients.js';

import CMS from '../pages/CMS.jsx';

export default withTracker(() => {
  const user = useTracker(() => Meteor.user());

  Meteor.subscribe('recipients');

  const recipientsHandle = Meteor.subscribe('recipients');
  const loading = !recipientsHandle.ready();

  return {
    recipients: Recipients.find({}, { sort: { createdAt: -1 } }).fetch(),
    loading,
    user,
  };
})(CMS);
