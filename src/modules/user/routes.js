'use strict'

const controller = require('./controller');
const validator = require('./validator');
const CONSTANTS = require('../../helpers/constants')
const URI = `${CONSTANTS.URI}/user`

module.exports = [
  {
    method: 'GET',
    path: URI,
    config: {
      description: 'GET user',
      notes: 'Return based on token',
      tags: ['api', 'admin'],
      auth: {
        scope: ['admin']
      },
      handler: controller.read,
      validate: validator.read()
    }
  },
  {
    method: 'POST',
    path: URI,
    config: {
      description: 'POST user',
      notes: 'Save a user',
      tags: ['api', 'admin'],
      auth: {
        scope: ['admin']
      },
      handler: controller.create,
      validate: validator.create()
    }
  },
  {
    method: 'POST',
    path: URI + '/logout',
    config: {
      description: 'POST user logout',
      notes: 'Logout a user',
      tags: ['api', 'admin'],
      auth: 'jwt',
      handler: controller.logout,
      validate: validator.logout()
    }
  },
  {
    method: 'PUT',
    path: URI,
    config: {
      description: 'PUT user',
      notes: 'Update based on token',
      tags: ['api', 'admin'],
      auth: {
        scope: ['admin']
      },
      handler: controller.update,
      validate: validator.update()
    }
  },
  {
    method: 'POST',
    path: URI + '/login',
    config: {
      description: 'POST user',
      notes: 'User login to the token generation',
      tags: ['api', 'admin'],
      auth: false,
      handler: controller.login,
      validate: validator.login()
    }
  }
];
