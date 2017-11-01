const Sequelize = require('sequelize');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

module.exports = function () {
  return [
    {
      register: require('good'),
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          }, {
            module: 'good-console'
          }, 'stdout']
        }
      }
    }, {
      register: require('hapi-sequelize'),
      options: [{
        name: 'slap',
        models: ['src/models/**.js'],
        sequelize: new Sequelize('slap', 'dbuser', 'dbuser', {
          host: 'postgres-hapi-api',
          port: 5432,
          dialect: 'postgres',
          operatorsAliases: Sequelize.Op,
          logging: false
        }),
        sync: true,
        forceSync: false
      }]
    }, {
      register: require('hapi-slap'),
      options: {
        url: 'redis://redis:6379/0',
        expireIn: 300
      }  
    }, {
      register: require('hapi-boom-decorators')
    }, {
      register: require('./documentation')
    }, {
      register: require('./auth'),
    }, {
      register: require('hapi-router'),
      options: {
        routes: 'src/modules/**/routes.js'
      }
    }
  ];
};
