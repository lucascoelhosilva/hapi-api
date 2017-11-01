'use strict'
const Hapi = require('hapi');
const server = new Hapi.Server();

const plugins = require('./src/config/plugins');
const Constants = require('./src/helpers/constants');

server.connection({
	host: process.env.HOST || '0.0.0.0',
	port: process.env.PORT || 3000,
	routes: {
		cors: {
		  credentials: true,
		  additionalHeaders: ['fields']
		},
		validate: {
		  options: {
				abortEarly: false
		  }
		}
	}
});

if(require.main === module){
	server.register(plugins(), (err) => {
		if (err) {
			return console.error(err);
		}
		server.start(() => {
			console.info(`Documentation api ${server.info.uri}/documentation`);
			console.info(`Servidor rodando em ${server.info.uri}`);
		});
	});
} else {
	module.exports = server;
}