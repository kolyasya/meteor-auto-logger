import { Meteor } from 'meteor/meteor';
import path from 'path';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
import isFunction from 'lodash.isfunction';

import startDDPLogger from './startDDPLogger';
import startPingPongTally from './startPingPongTally';

import startDDPFileLogger from './startDDPFileLogger';

import { PackageLogger } from './package-utils';

const meteorRootPath =
  path?.resolve('.')?.split(`${path.sep}.meteor`)?.[0] || '../../../../..';

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

checkNpmVersions(
  {
    'lodash.pullall': '4.2.x',
    'lodash.isfunction': '3.0.x',
  },
  'kolyasya:meteor-pagination'
);

export default class AutoLogger {
  constructor() {
    if (this instanceof AutoLogger) {
      throw Error(
        'AutoLogger class cannot be instantiated. Use AutoLogger.start() function.'
      );
    }
  }

  static async start(params) {
    const { eventsLogger, tallyLogger, eventsLoggerFilter } = params;

    const logger = PackageLogger({
      enableLogging: packageSettings?.enablePackageDebugLogs,
      logPrefix: `kolyasya:auto-logger |`,
    });

    if (isFunction(eventsLogger)) {
      this.eventsLogger = eventsLogger;
    }
    if (isFunction(tallyLogger)) {
      this.tallyLogger = tallyLogger;
    }
    if (isFunction(eventsLoggerFilter)) {
      this.eventsLoggerFilter = eventsLoggerFilter;
    }

    logger.log('Final package settings:', packageSettings);
    logger.log('Init params:', params);

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
