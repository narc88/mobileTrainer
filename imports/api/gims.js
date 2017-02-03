import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Gims = new Mongo.Collection('gims');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish gims that are public or belong to the current user
  Meteor.publish('gims', function gimsPublication() {
    return Gims.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'gims.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a gim
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Gims.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'gims.remove'(gimId) {
    check(gimId, String);

    const gim = Gims.findOne(gimId);
    if (gim.private && gim.owner !== this.userId) {
      // If the gim is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Gims.remove(gimId);
  },
  'gims.setChecked'(gimId, setChecked) {
    check(gimId, String);
    check(setChecked, Boolean);

    const gim = Gims.findOne(gimId);
    if (gim.private && gim.owner !== this.userId) {
      // If the gim is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Gims.update(gimId, { $set: { checked: setChecked } });
  },
  'gims.setPrivate'(gimId, setToPrivate) {
    check(gimId, String);
    check(setToPrivate, Boolean);

    const gim = Gims.findOne(gimId);

    // Make sure only the gim owner can make a gim private
    if (gim.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Gims.update(gimId, { $set: { private: setToPrivate } });
  },
});