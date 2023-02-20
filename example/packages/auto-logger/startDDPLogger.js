import getEventMessage from './utils/getEventMessage';
import getPrettyIPAddress from './utils/getPrettyIPAddress';
import getPackageLogger from './utils/getPackageLogger';

/**
 * DDP Server Logs
 */
const startDDPLogger = ({ packageSettings, eventsLogger, eventsLoggerFilter }) => {
  const packageLogger = getPackageLogger();

  packageLogger('Starting DDP Logger...');

  Meteor.server.stream_server.register(
    Meteor.bindEnvironment(socket => {
      socket.on(
        'data',
        Meteor.bindEnvironment(messageDDP => {
          const messageJSON = JSON.parse(messageDDP);
          const userId = socket._meteorSession.userId;

          // Log everything except pings and pongs
          if (messageJSON.msg !== 'ping' && messageJSON.msg !== 'pong') {
            const { eventMessage, event } = getEventMessage({
              clientAddress: getPrettyIPAddress(
                (socket._meteorSession.connectionHandle || {}).clientAddress
              ),
              eventsLoggerFilter,
              messageJSON,
              userId,
            });

            eventsLogger(eventMessage, event);
          }
        })
      );
    })
  );
};

export default startDDPLogger;
