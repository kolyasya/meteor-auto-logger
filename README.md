# kolyasya:auto-logger — Log Meteor DDP events automatically

## Installation:

```
meteor add kolyasya:auto-logger
```

## Package settings:

```
{
...regular Meteor settings.json file...

  packages: {

    ...other packages settings...,

    "kolyasya:auto-logger": {
      // Logs for debugging purposes, not needed in normal circumstances
      "enablePackageDebugLogs": false,

      // Main logging to be printed in console
      "enableDDPAutoLogger": true,

      // Log all DDP events into file in root Meteor directory
      "enableDDPFileLogger": false,
      // In case if you need a non-standard path
      "ddpFileLoggerPath": '../../../../..'

      // Calculates sum of sub and methods calls
      "enableDDPTallyLogger": true,
      // Interval for calculation
      "DDPTallyLoggerSeconds": 60,

      // Cache is used only for current user now, time in ms
      "customCacheTime": 300000
    }
  }
}
```
