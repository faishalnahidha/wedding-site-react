import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Recipients = new Mongo.Collection('recipients');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('recipients', function recipientsPublication() {
    return Recipients.find();
  });

  Meteor.publish('recipients', (id) => {
    check(id, String);

    return Recipients.find({ _id: id });
  });
}

Meteor.methods({
  'recipients.insert'(idInput, nameInput) {
    check(idInput, String);
    check(nameInput, String);

    // Make sure the user is logged in before inserting a task
    /* if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      } */

    Recipients.insert({
      _id: idInput,
      name: nameInput,
      createdAt: new Date(),
    });
  },
  'recipients.remove'(recipientId) {
    check(recipientId, String);

    Recipients.remove(recipientId);
  },
  'recipients.updateRsvp'(recipientId, rsvpInput, messageInput) {
    check(recipientId, String);
    check(rsvpInput, String);
    check(messageInput, String);

    Recipients.update(recipientId, {
      $set: { rsvp: rsvpInput, message: messageInput },
    });
  },
});
