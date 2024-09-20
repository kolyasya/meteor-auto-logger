Package.describe({
  name: 'kolyasya:auto-logger',
  version: '0.0.3-beta.6',
  summary: 'Auto-logging for Meteor methods and publications',
  git: 'https://github.com/kolyasya/meteor-auto-logger',
  documentation: '../../../README.md',
});

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '2.8.1', '3.0-beta.0']);

  api.use(
    [
      'accounts-base',
      'ecmascript@0.16.9',
      'typescript@5.4.3',
      'tmeasday:check-npm-versions@2.0.0',
      'zodern:types@1.0.13',
    ],
    ['server']
  );

  api.mainModule('server.ts', 'server');
});
