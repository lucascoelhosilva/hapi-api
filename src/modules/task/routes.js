'use strict'

const controller = require('./controller');
const validators = require('./validator');
const CONSTANTS = require('../../helpers/constants')
const URI = `${CONSTANTS.URI}/task`

module.exports = [
  {
    method: 'GET',
    path: URI,
    config: {
      description: 'GET task',
      notes: 'GET task',
      tags: ['api', 'task'],
      plugins: {
        slap: {
          rule: 'task'
        }
      },
      auth: {
        scope: ['admin']
      },
      handler: controller.list,
      validate: validators.list()
    }
  }, 
  {
    method: 'DELETE',
    path: URI + '/{id}',
    config: {
      description: 'DELETE task',
      notes: 'DELETE task',
      tags: ['api', 'task'],
      plugins: {
        slap: {
          clear: ['task', 'task-id']
        }
      },
      auth: {
        scope: ['admin']
      },
      handler: controller.destroy,
      validate: validators.destroy()
    }
  },
  {
    method: 'PUT',
    path: URI + '/{id}',
    config: {
      description: 'PUT task',
      notes: 'PUT task',
      tags: ['api', 'task'],
      plugins: {
        slap: {
          clear: ['task', 'task-id']
        }
      },
      auth: {
        scope: ['admin']
      },
      handler: controller.update,
      validate: validators.update()
    }
  },
  {
    method: 'POST',
    path: URI,
    config: {
      description: 'POST task',
      notes: 'POST task',
      tags: ['api', 'task'],
      plugins: {
        slap: {
          clear: ['task', 'task-id']
        }
      },
      auth: {
        scope: ['admin']
      },
      handler: controller.create,
      validate: validators.create()
    }
  },
  {
    method: 'GET',
    path: URI + '/{id}',
    config: {
      description: 'View task',
      notes: 'View task',
      tags: ['api', 'task'],
      plugins: {
        slap: {
          rule: 'task-id',
          expireIn: 60
        }
      },
      auth: {
        scope: ['admin']
      },
      handler: controller.show,
      validate: validators.show()
    }
  }
];