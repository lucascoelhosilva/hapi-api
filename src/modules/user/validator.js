const Joi = require('joi');

module.exports = {
  create: create,
  update: update,
  login: login,
  logout: logout,
  read: read
};

const schema = {
  id: Joi
    .number()
    .integer()
    .min(0),
  name: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  email: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  password: Joi
    .string()
    .max(120)
    .trim()
};


function logout () {
  return {};
}

function login () {
  return {
    payload: Joi.object({
      email: schema
        .email
        .required(),
      password: schema
        .password
        .required()
    })
  };
}

function create () {
  return {
    payload: Joi.object({
      email: schema
        .email
        .required(),
      password: schema
        .password
        .required()
    })
  };
}

function update () {
  return {
    payload: Joi.object({
      email: schema
        .email
        .required(),
      password: schema
        .password
        .optional()
    })
  };
}

function read () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}


