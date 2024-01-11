import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

import AutoLogger from 'meteor/kolyasya:auto-logger';

await AutoLogger.start({
  // Doing it like this to preserve 'this'
  eventsLogger: (message) => {
    console.log('This is events log message:', message);
  },
  tallyLogger: (message) => {
    console.log('This is tally log message:', message);
  },

  ddpMessageFilter: ({ messageJSON }) => {
    return messageJSON?.method?.includes('loggly.') ? false : true;
  },
});

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }
});

Meteor.publish('links', () => {
  return LinksCollection.find();
});
