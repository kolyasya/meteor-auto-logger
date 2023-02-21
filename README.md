# kolyasya:auto-logger — Log Meteor DDP events automatically

## Features:

- Print all DDP messages (except ping/pong and filtered by `ddpMessageFilter` to server console)
- Print all DDP messages into ddp-log.json file
- Print summary of called subsciptions and methods to server console by interval 

## Installation:

```
meteor add kolyasya:auto-logger
```

## Package settings:

```js
{
  // ...regular Meteor settings.json file...

  packages: {

    // ...other packages settings...,

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

## Usage example:

```js
import AutoLogger from "meteor/kolyasya:auto-logger";

new AutoLogger({
  // Doing it like this to preserve 'this'
  eventsLogger: (message) => {
    console.log("This is events log message:", message);
  },
  tallyLogger: (message) => {
    console.log("This is tally log message:", message);
  },

  ddpMessageFilter: ({ messageJSON }) => {
    // Exclude loggly messages
    return messageJSON?.method?.includes("loggly.") ? false : true;
  },
});
```
