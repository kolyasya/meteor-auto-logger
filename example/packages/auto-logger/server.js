import { Meteor } from 'meteor/meteor';
import path from 'path';
import isFunction from 'lodash.isfunction';

import startDDPLogger from './startDDPLogger';
import startPingPongTally from './startPingPongTally';

import startDDPFileLogger from './startDDPFileLogger';

import getPackageLogger from './utils/getPackageLogger';

const meteorRootPath = path?.resolve('.')?.split(`${path.sep}.meteor`)?.[0] || '../../../../..';

const defaultSettings = {
  enablePackageDebugLogs: false,

  enableDDPAutoLogger: false,

  enableDDPFileLogger: false,

  enableDDPTallyLogger: true,
  DDPTallyLoggerSeconds: 60,

  customCacheTime: 300000,
  ddpFileLoggerPath: `${meteorRootPath}/ddp-log.json`,
};

const packageSettings = {
  ...defaultSettings,
  ...(Meteor.settings?.packages?.['kolyasya:auto-logger'] || {}),
};

export default class AutoLogger {
  constructor() {
    if (this instanceof AutoLogger) {
      throw Error('AutoLogger class cannot be instantiated. Use AutoLogger.start() function.');
    }
  }

  static async start(params) {
    const { eventsLogger, tallyLogger, eventsLoggerFilter } = params;

    // This is logger for package debugging purposes
    this.packageLogger = getPackageLogger({ packageSettings });

    if (isFunction(eventsLogger)) {
      this.eventsLogger = eventsLogger;
    }
    if (isFunction(tallyLogger)) {
      this.tallyLogger = tallyLogger;
    }
    if (isFunction(eventsLoggerFilter)) {
      this.eventsLoggerFilter = eventsLoggerFilter;
    }

    this.packageLogger('Final package settings:', packageSettings);
    this.packageLogger('Init params:', params);

    if (packageSettings?.enableDDPAutoLogger && this.eventsLogger) {
      await startDDPLogger({
        packageSettings,
        eventsLogger: this.eventsLogger,
        eventsLoggerFilter: this.eventsLoggerFilter,
      });
    }

    if (packageSettings?.enableDDPTallyLogger && this.tallyLogger) {
      await startPingPongTally({
        packageSettings,
        tallyLogger: this.tallyLogger,
      });
    }

    if (packageSettings?.enableDDPFileLogger) {
      startDDPFileLogger({ packageSettings });
    }
  }
}
