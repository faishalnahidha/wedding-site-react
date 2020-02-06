import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Recipients } from '../api/recipients.js';

import LandingPage from './LandingPage.jsx';

export default withTracker(({ match }) => {
    const id = match.params.id;

    /* ------- handle access from root dns --------- */
    if (id === undefined) {
        const recipient = {
            _id: "0",
            name: "(＾ω＾)"
        };
        const recipientExists = true;
        return {
            recipient,
            recipientExists
        }
    }

    const recipientId = id.toLowerCase();
    const recipientsHandle = Meteor.subscribe('recipients', recipientId);

    const loading = !recipientsHandle.ready();
    const recipient = Recipients.findOne({ _id: recipientId });
    const recipientExists = !loading && recipient !== undefined && recipient !== null;

    /* if (recipient !== undefined) {
        console.log('recipient: ' + recipient.name);
    } */

    return {
        loading,
        recipient,
        recipientExists
    }
})(LandingPage);