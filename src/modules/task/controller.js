'use strict';

module.exports = {
  create: create,
  update: update,
  list: list,
  show: show, 
  destroy: destroy
};

async function create (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.Task;
    const payload = request.payload;

    payload.userId = request.auth.credentials.id;

    const value = await model.create(payload);

    request.clearCache();

    return reply({id: value.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function update (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.Task;
    const id = request.params.id;
    const payload = request.payload;
    const credentials = request.auth.credentials.id;

    const value = await model.scope({method: ['user', credentials]}).findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    request.clearCache();

    const valueUpdate = await value.update(payload, {where: {id: id}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function show (request, reply) {
  try {
    const cache = await request.getCache(id);

    if (cache) {
      return reply(cache);
    }

    const db = request.getDb('slap');
    const model = db.models.Task;
    const id = request.params.id;
    
    const value = await model.scope({method: ['user', credentials]}).findOne({where: {id: id}});
    
    if (!value) {
      return reply.notFound();
    }

    request.addCache(value, id);

    return reply(value);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const db = request.getDb('slap');
    const model = db.models.Task;
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

async function list (request, reply) {
  try {
    const cache = await request.getCache();
    
    if (cache) {
      return reply(cache);
    }

    const db = request.getDb('slap');
    const model = db.models.Task;
    const credentials = request.auth.credentials.id;


    const values = await model.scope({method: ['user', credentials]}).findAndCountAll();

    request.addCache(values);

    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};