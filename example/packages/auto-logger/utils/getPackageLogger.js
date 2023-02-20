let loggerInstance = undefined;

const getPackageLogger = function ({ packageSettings } = {}) {
  if (!loggerInstance) {
    loggerInstance = function () {
      if (packageSettings?.enablePackageDebugLogs) {
        console.log.apply(this, [`kolyasya:auto-logger |`, ...arguments]);
      }
    };
    loggerInstance('Package logger initiated successfully');
  }
  return loggerInstance;
};

export default getPackageLogger;
