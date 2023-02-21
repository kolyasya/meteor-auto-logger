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
  api.versionsFrom('2.3.5');
  api.use(['accounts-base', 'ecmascript']);

  api.mainModule('server.js', 'server');
});
