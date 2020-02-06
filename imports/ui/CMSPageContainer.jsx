import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

/* import collection api */
import { Recipients } from '../api/recipients.js';

import CMSPage from './CMSPage.jsx';

export default withTracker(() => {
    Meteor.subscribe('recipients');

    const recipientsHandle = Meteor.subscribe('recipients');
    const loading = !recipientsHandle.ready();

    return {
        recipients: Recipients.find({}, { sort: { createdAt: -1 } }).fetch(),
        loading
    }
})(CMSPage);