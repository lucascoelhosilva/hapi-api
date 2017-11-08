const jwt = require('jsonwebtoken');
const client = require('../../config/client.redis');

module.exports = {
  create: create,
  update: update,
  read: read,
  destroy: destroy,
  all: all,
  login: login,
  logout: logout
};

async function create (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.User;
    const payload = request.payload;

    const value = await model.create(payload);

    const tokenUser = getToken(value.id);

    setRedis(tokenUser, value.id);

    return reply({
      token: tokenUser
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.User;

    const options = {
      where: {id: request.auth.credentials.id}
    };

    const value = await model.findOne(options);
    if (!value) {
      return reply.notFound();
    }

    return reply(value);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function all (request, reply) {
  try {
    const cache = await request.getCache();
    
    if (cache) {
      return reply(cache);
    }

    const db = request.getDb('slap');
    const model = db.models.User;

    const values = await model.findAll();
    
    if (!values) {
      return reply.notFound();
    }

    request.addCache(values);    

    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function update (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.User;
    const id = request.auth.credentials.id;
    const payload = request.payload;

    const value = await model.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    const valueUpdate = await value.update(payload, {where: {id: id}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function login (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.User;
    const credentials = request.payload;

    const user = await model.findOne({ where: {email: credentials.email} });
    if (!user) {
      return reply.unauthorized('Login or Password invalid');
    }

    if (!user.validatePassword(credentials.password)) {
      return reply.unauthorized('Login or Password invalid');
    }

    const tokenUser = getToken(user.id);
    setRedis(tokenUser, user.id);

    return reply({
      token: tokenUser
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function logout (request, reply) {
  try {
    const token = request.headers.authorization.replace('Bearer ', '');

    client.del(token, (err, result) => {
      if (err) {
        throw err;
      }
      return reply();
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.User;
    const id = request.params.id;
    const credentials = request.auth.credentials.id;

    const value = await model.scope({method: ['user', credentials]}).findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    request.clearCache();

    await value.destroy();

    return reply({
      id: value.id
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function setRedis (token, id) {
  client.set(token, id);
  client.expire(token, (60 * 60) * 24);
}

function getToken (id) {
  const secretKey = process.env.JWT || 'slap';

  return jwt.sign({
    id: id,
    scope: ['admin']
  }, secretKey, {expiresIn: '2h'});
}
