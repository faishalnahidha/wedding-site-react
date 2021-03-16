import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RecipientsCollection } from '../imports/db/RecipientsCollection.js';
import '../imports/api/recipientsMethods.js';
import '../imports/api/recipientsPublications.js';

const SEED_USERNAME = 'user'; // before is 'meteorite'
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  // If the Recipients collection is empty, add some data.
  if (RecipientsCollection.find().count() === 0) {
    const lisaMayer = {
      _id: 'lisa-mayer',
      name: 'Lisa Mayer',
      createdAt: new Date(),
    };

    RecipientsCollection.insert(lisaMayer);
  }
});
