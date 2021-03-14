import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RecipientsCollection } from '../db/RecipientsCollection.js';

Meteor.publish('recipients', function () {
  return RecipientsCollection.find();
});

Meteor.publish('recipients.one', function (id) {
  check(id, String);

  return RecipientsCollection.find(
    { _id: id },
    {
      fields: { createdAt: 0 },
    }
  );
});

Meteor.publish('recipients.latestMessages', function () {
  return RecipientsCollection.find(
    { message: { $exist: true } },
    { fields: { name: 1, message: 1, _id: 0 } }
  ).limit(5);
});
