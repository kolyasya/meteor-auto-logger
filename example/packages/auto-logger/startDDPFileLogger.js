import fs from 'fs';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';


import getPackageLogger from './utils/getPackageLogger';

// ----------------------------------------------------------------------
// DDP Debugger (Every DDP message, realtime, written raw to file, off by default )
// ----------------------------------------------------------------------

const startDDPFileLogger = ({ packageSettings }) => {
  const packageLogger = getPackageLogger();

  packageLogger('Starting DDP File logger...');

  let memory = {};

  const appendOnNewLine = line => {
    try {
      fs.appendFileSync(packageSettings.ddpFileLoggerPath, line + '\n');
    }
    catch (error) {
      console.error(error);
    }
  };

  const log = function (direction, str) {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var year = now.getFullYear();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var ms = now.getMilliseconds();

    let json = {
      direction,
      date: `${month}/${day}/${year} ${hour}:${min}:${sec}.${ms}`,
    };

    try {
      json = { ...json, ...JSON.parse(str) };
    }
    catch (e) {
      console.error(`Ran into a message I couldn't parse: ${str}`);
      json.bad = true;
    }

    if (json.msg === 'sub' && json.id) {
      memory[json.id] = json.name;
    }

    if ((json.msg === 'unsub' || json.msg === 'nosub') && json.id) {
      json.name = memory[json.id];
    }

    json.rawJson = JSON.stringify(json);
    json.msgLength = json.rawJson.length;
    json.randomId = Random.id();

    appendOnNewLine(JSON.stringify(json));
  };

  Meteor.server.stream_server.register(
    Meteor.bindEnvironment(socket => {
      const originalSend = socket.send;
      socket.send = function (f) {
        log('Sent', f);
        originalSend(f);
      };

      socket.on(
        'data',
        Meteor.bindEnvironment(messageDDP => {
          log('Received', messageDDP);
        })
      );
    })
  );
};

export default startDDPFileLogger;
