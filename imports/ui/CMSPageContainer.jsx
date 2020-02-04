import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

/* import collection api */
import { Recipients } from '../api/recipients.js';

import CMSPage from './CMSPage.jsx';

export default withTracker(() => {
    Meteor.subscribe('recipients');

    return {
        recipients: Recipients.find({}, { sort: { createdAt: -1 } }).fetch(),
    }
})(CMSPage);