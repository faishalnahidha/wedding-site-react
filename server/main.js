import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Recipients } from '../imports/api/recipients';

const SEED_USERNAME = 'user'; // before 'meteorite'
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  // if (Links.find().count() === 0) {
  //   insertLink(
  //     "Do the Tutorial",
  //     "https://www.meteor.com/tutorials/react/creating-an-app"
  //   );

  //   insertLink("Follow the Guide", "http://guide.meteor.com");

  //   insertLink("Read the Docs", "https://docs.meteor.com");

  //   insertLink("Discussions", "https://forums.meteor.com");
  // }

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (Recipients.find().count() === 0) {
    const lisaMayer = {
      _id: 'lisa-mayer',
      name: 'Lisa Mayer',
      createdAt: new Date(),
    };

    Recipients.insert(lisaMayer);
  }
});
