import getPrettyUser from './utils/getPrettyUser';
import getPrettyIPAddress from './utils/getPrettyIPAddress';
import getPackageLogger from './utils/getPackageLogger';

import PingPongTally from './utils/PingPongTally';


/**
 * DDP Ping Pong Tally (Message statistics, timer driven, written to console, on by default)
 * Calculates stats for a given interval
 */
const startPingPongTally = ({ packageSettings, tallyLogger }) => {
  const packageLogger = getPackageLogger();

  packageLogger('Starting Ping Pong Tally...');

  Meteor.server.stream_server.register(
    Meteor.bindEnvironment(socket => {
      socket.on(
        'data',
        Meteor.bindEnvironment(messageDDP => {
          const messageJSON = JSON.parse(messageDDP);

          // Capture statistics about this message to our "ping pong" tally
          const sessionId = socket._meteorSession.id;
          const sessionStats = PingPongTally.getItem(sessionId) || {};

          // Increase number for event type (method, sub or anything else)
          sessionStats[messageJSON.msg] = (sessionStats[messageJSON.msg] || 0) + 1;

          // Save back
          PingPongTally.setItem(sessionId, sessionStats);
        })
      );
    })
  );

  Meteor.setInterval(() => {
    // This looks like it's also accessible from Meteor.default_server.  Difference?
    for (let [sessionKey, session] of Meteor.server.sessions) {
      // Construct the pieces of the message

      // Returns something like { connect: 1, method: 1, sub: 8 }
      const sessionStats = PingPongTally.getItem(sessionKey) || {};

      // ['connect', 'method', 'sub', ...]
      const statItemsNames = Object.keys(sessionStats).filter(t => t !== 'ping' && t !== 'pong');

      // Meteor type, contains { collectionName, documents, collbacks }
      const collectionViews = session.collectionViews;

      // Get only app's collections like: [ 'users', 'organizations', ...]
      const collectionsNames = Array.from(collectionViews.keys()).filter(
        c => c && !c.startsWith('meteor_')
      );

      const prettyUser = getPrettyUser(session.userId);

      const collectionCounts = collectionsNames.map(
        c => c + ': ' + collectionViews.get(c).documents.size
      );

      // Add sum of all published documents
      const collectionsTotal = collectionsNames.reduce(
        (t, c) => t + collectionViews.get(c).documents.size,
        0
      );
      if (collectionsTotal) {
        collectionCounts.push('Σ: ' + collectionsTotal);
      }

      // Returns ['subs: 8', 'connects: 5', ...]
      const statItemsCounts = statItemsNames.map(t => t + 's: ' + sessionStats[t]);

      const debuggerWarning = Meteor.settings.enableDDPDebugger ? ' (debugger on)' : '';

      const prettyIPAddress = getPrettyIPAddress(session.connectionHandle.clientAddress);

      // Construct the message
      let message = `${prettyUser}@${prettyIPAddress}: (${statItemsCounts.join(
        ', '
      )}) -> (${collectionCounts.join(', ')})${debuggerWarning}`;

      // message = abbreviateMessage(message);

      packageLogger(message);
      tallyLogger(message);
    }
    PingPongTally.reset();
  }, packageSettings.DDPTallyLoggerSeconds * 1000);
};

export default startPingPongTally;
