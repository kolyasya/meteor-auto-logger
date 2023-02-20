import { Meteor } from 'meteor/meteor';
import LRU from 'ylru';

// Cache the user
const prettyUserIdentifierLRU = new LRU(100);

const getPrettyUser = function (userId) {
  if (!userId) return 'unknown';

  const g = prettyUserIdentifierLRU.get(userId);
  if (g) return g;

  const u = Meteor.users.findOne(userId);
  if (!u) return `unknown user ${userId}`;

  const p = `${u.username}`;
  prettyUserIdentifierLRU.set(userId, p, {
    maxAge: Meteor.settings?.public?.customCache
      ? Meteor.settings?.public?.customCacheTime
      : 300000 /* 5 minutes */,
  });
  return p;
};

export default getPrettyUser;
