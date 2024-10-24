Package.describe({
  name: 'kolyasya:auto-logger',
  version: '1.0.0-beta.0',
  summary: 'Auto-logging for Meteor methods and publications',
  git: 'https://github.com/kolyasya/meteor-auto-logger',
  documentation: '../../../README.md',
});

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '2.8.1', '3.0-beta.0']);

  api.use(
    [
      'accounts-base@3.0.2',
      'ecmascript@0.16.9',
      'typescript@5.4.3',
      'zodern:types@1.0.13',
    ],
    ['server']
  );

  api.mainModule('server.ts', 'server');
});

Npm.depends({
  'lodash.pullall': '4.2.0',
  'lodash.isfunction': '3.0.9',
  'defaults': '3.0.0',
  ylru: '2.0.0',
});
