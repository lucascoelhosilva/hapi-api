'use strict';

const redis = require('redis');
const config = {
    host: process.env['REDIS_PORT_6379_TCP_ADDR'] || 'redis',
    port: process.env['REDIS_PORT_6379_TCP_PORT'] || '6379'
};

const client = redis.createClient(config.port, config.host);

client.on('connect', () => {
  console.log('===> connected redis');
});

module.exports = client;
