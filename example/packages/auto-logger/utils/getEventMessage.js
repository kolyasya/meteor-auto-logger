import getPrettyUser from './getPrettyUser';
import isFunction from 'lodash.isfunction';

const getEventMessage = async ({ clientAddress, eventsLoggerFilter, messageJSON, userId }) => {
  if (isFunction(eventsLoggerFilter)) {
    if (!eventsLoggerFilter({ messageJSON })) {
      return;
    }
  }

  // Make arguments consistent across different data shapes
  let arg = {};

  if (messageJSON.params) {
    arg = { params: messageJSON.params };
  }

  if (messageJSON.id && ['sub', 'unsub'].includes(messageJSON.msg)) {
    arg = { ...arg, subscriptionId: messageJSON.id };
  }

  // Remove login tokens, as these leak sensitive data
  if (messageJSON.msg === 'method' && messageJSON.method === 'login') {
    arg.params = null;
  }

  // Construct the event
  const event = {
    name: messageJSON.method || messageJSON.name,
    type: messageJSON.msg,
    arg,
    userId,
    createdAt: new Date(),
  };

  let eventMessage = `${await getPrettyUser(userId)}@${clientAddress}: ${event.type}`;

  if (event.name) {
    eventMessage += ` ${event.name}`;
  }

  if (event.arg.params && event.arg.params.length > 0 && event.arg.params.some(p => p !== null)) {
    const prettyParams = event.arg.params.map(p => JSON.stringify(p)).join(', ');
    eventMessage += `(${prettyParams})`;
  }

  if (event.arg.subscriptionId) eventMessage += ` with subId ${event.arg.subscriptionId}`;

  return { eventMessage, event };
};

export default getEventMessage;
