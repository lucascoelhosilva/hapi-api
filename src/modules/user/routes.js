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
      tags: ['api', 'user'],
      auth: {
        scope: ['admin']
      },
      handler: controller.read,
      validate: validator.read()
    }
  },
  {
    method: 'GET',
    path: URI + 's',
    config: {
      description: 'GET users',
      notes: 'GET users',
      tags: ['api', 'user'],
      plugins: {
        slap: {
          rule: 'user'
        }
      },
      auth: false,
      handler: controller.all,
      validate: validator.all()
    }
  },
  {
    method: 'DELETE',
    path: URI + '/{id}',
    config: {
      description: 'DELETE user',
      notes: 'DELETE user',
      tags: ['api', 'user'],
      plugins: {
        slap: {
          clear: ['user', 'user-id']
        }
      },
      auth: {
        scope: ['admin']
      },
      handler: controller.destroy,
      validate: validator.destroy()
    }
  },
  {
    method: 'POST',
    path: URI,
    config: {
      description: 'POST user',
      notes: 'Create a user',
      tags: ['api', 'user'],
      auth: false,
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
      tags: ['api', 'user'],
      auth: {
        scope: ['admin']
      },
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
      tags: ['api', 'user'],
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
      tags: ['api', 'user'],
      auth: false,
      handler: controller.login,
      validate: validator.login()
    }
  }
];
