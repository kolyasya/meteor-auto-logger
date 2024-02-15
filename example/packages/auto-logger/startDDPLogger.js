import getEventMessage from './utils/getEventMessage';
import getPrettyIPAddress from './utils/getPrettyIPAddress';
import { PackageLogger } from './package-utils';

/**
 * DDP Server Logs
 */
const startDDPLogger = async ({
  packageSettings,
  eventsLogger,
  eventsLoggerFilter,
}) => {
  const logger = PackageLogger();

  logger.log('Starting DDP Logger...');

  Meteor.server.stream_server.register(
    await Meteor.bindEnvironment(async (socket) => {
      socket.on(
        'data',
        await Meteor.bindEnvironment(async (messageDDP) => {
          const messageJSON = JSON.parse(messageDDP);
          const userId = socket._meteorSession.userId;

          // Log everything except pings and pongs
          if (messageJSON.msg !== 'ping' && messageJSON.msg !== 'pong') {
            const { eventMessage, event } = await getEventMessage({
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
