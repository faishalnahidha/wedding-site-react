import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RecipientsCollection } from '../db/RecipientsCollection.js';

Meteor.methods({
  'recipients.insert'(idInput, nameInput) {
    check(idInput, String);
    check(nameInput, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    RecipientsCollection.insert({
      _id: idInput,
      name: nameInput,
      createdAt: new Date(),
    });
  },
  'recipients.remove'(recipientId) {
    check(recipientId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    RecipientsCollection.remove(recipientId);
  },

  // 'recipients.updateRsvp'(recipientId, rsvpInput, isWithPartner, messageInput) {
  'recipients.updateRsvp'(recipientId, rsvpInput, isWithPartner, messageInput) {
    check(recipientId, String);
    check(rsvpInput, String);
    // check(isWithPartner, Boolean);
    check(messageInput, String);

    RecipientsCollection.update(recipientId, {
      //$set: { rsvp: rsvpInput, withPartner: isWithPartner, message: messageInput },
      $set: { rsvp: rsvpInput, message: messageInput },
    });
  },
});
