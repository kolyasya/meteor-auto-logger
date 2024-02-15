Package.describe({
  name: 'kolyasya:auto-logger',
  version: '0.0.2',
  summary: 'Auto-logging for Meteor methods and publications',
  git: 'https://github.com/kolyasya/meteor-auto-logger',
  documentation: '../../../README.md',
});

Npm.depends({
  ylru: '1.2.1',
  'lodash.isfunction': '3.0.9',
});

Package.onUse(function (api) {
  api.use(['accounts-base@2.0.1', 'ecmascript@1.13.0']);

  api.mainModule('server.js', 'server');
});
