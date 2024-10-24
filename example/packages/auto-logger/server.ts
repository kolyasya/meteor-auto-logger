import { Meteor } from 'meteor/meteor';
import path from 'path';
import isFunction from 'lodash.isfunction';
import defaults from 'defaults';

import startDDPLogger from './startDDPLogger';
import startPingPongTally from './startTallyLogger';
import startDDPFileLogger from './startDDPFileLogger';

import { PackageLogger } from './package-utils';

import type { AutoLoggerStartParams, AutoLoggerSettings } from './types';

const meteorRootPath =
  path?.resolve('.')?.split(`${path.sep}.meteor`)?.[0] || '../../../../..';

const defaultSettings: AutoLoggerSettings = {
  enablePackageDebugLogs: false,

  enableDDPAutoLogger: true,

  enableDDPTallyLogger: true,
  DDPTallyLoggerSeconds: 60,

  enableDDPFileLogger: false,

  customCacheTime: 300000,
  ddpFileLoggerPath: `${meteorRootPath}/ddp-log.json`,
};

export default class AutoLogger {
  static eventsLogger;
  static tallyLogger;
  static eventsLoggerFilter;

  constructor() {
    if (this instanceof AutoLogger) {
      throw Error(
        'AutoLogger class cannot be instantiated. Use AutoLogger.start() function.'
      );
    }
  }

  static getPackageSettings(settings: AutoLoggerSettings = {}) {
    const settingsFromFile = defaults(
      Meteor.settings?.packages?.['kolyasya:auto-logger'] || {},
      defaultSettings
    );

    return defaults(settings, settingsFromFile);
  }

  static async start(
    params: AutoLoggerStartParams,
    settings?: AutoLoggerSettings
  ) {
    const { eventsLogger, tallyLogger, eventsLoggerFilter } = params;

    const packageSettings = this.getPackageSettings(settings);

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
        // packageSettings,
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
