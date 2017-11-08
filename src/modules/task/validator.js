const Joi = require('joi');

module.exports = {
  destroy: destroy,
  create: create,
  update: update,
  list: list,
  show: show
};

const schema = {
  id: Joi
    .number()
    .integer()
    .min(0),
  title: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  userId: Joi
    .number()
    .integer()
    .min(0)
};


function create () {
  return {
    payload: Joi.object({
      title: schema
        .title
        .required()
    })
  };
}

function update () {
  return {
    params: {
      id: schema
        .id
        .required()
    },
    payload: Joi.object({
      title: schema
        .title
        .required()
    })
  };
}

function list () {
  return {
    query: {
      title: schema
        .title
        .optional()
    }
  };
}

function destroy () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}

function show () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}
