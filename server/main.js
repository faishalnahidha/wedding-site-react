import { Meteor } from "meteor/meteor";
import { Recipients } from "../imports/api/recipients.js";
//import "../imports/api/guests.js";

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

  if (Recipients.find().count() === 0) {
    const chizuruMizuhara = {
      _id: "chizuru-mizuhara",
      name: "Chizuru Mizuhara",
      createdAt: new Date()
    };

    Recipients.insert(chizuruMizuhara);
  }
});
