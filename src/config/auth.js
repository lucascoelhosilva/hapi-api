const jwt = require('hapi-auth-jwt2');
const jsonWebToken = require('jsonwebtoken');
const client = require('./client.redis');

const key = process.env.JWT || 'slap';

exports.register = (server, options, next) => {
  server.register(jwt, registerAuth);

  function registerAuth (err) {
    if (err) { 
      return next(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      key: key,
      validateFunc: validate,
      verifyOptions: {algorithms: [ 'HS256' ]}
    });

    server.auth.default({
      strategy: 'jwt',
      scope: ['admin']
    });

    return next();
  }

  // bring your own validation function
  var validate = function (decoded, request, cb) {
    const token = request.headers.authorization.replace('Bearer ', '');

    client.get(token, (err, res) => {
      if(err) {
        console.log(err);
      }
      
      jsonWebToken.verify(token, key, (err, decoded) => {
        if (err) {
          return cb(null, false);
        }
        return cb(null, true);
      });
    });
  };
};

exports.register.attributes = {
  name: 'auth',
  version: '1.0.0'
};
