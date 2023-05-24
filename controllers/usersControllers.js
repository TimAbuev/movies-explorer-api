const User = require('../models/userSchema').userSchema;

function createTestUser(req, res, next) {
  const { ...userProps } = req.body;
  return User.create({ ...userProps })
    .then((users) => res.status(201).send(users))
    .catch((err) => next(err));
}

module.exports = { createTestUser };
