Package.describe({
  name: 'kolyasya:auto-logger',
  version: '0.0.3-beta.1',
  summary: 'Auto-logging for Meteor methods and publications',
  git: 'https://github.com/kolyasya/meteor-auto-logger',
  documentation: '../../../README.md',
});

Npm.depends({
  ylru: '1.2.1',
  'lodash.isfunction': '3.0.9',
});

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '2.8.1', '3.0-beta.0']);

  api.use(['accounts-base', 'ecmascript'], ['server'], { weak: true });

  api.use(['tmeasday:check-npm-versions@2.0.0-beta.0']);

  api.mainModule('server.js', 'server');
});
