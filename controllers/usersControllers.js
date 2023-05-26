const User = require('../models/userSchema').userSchema;

function createTestUser(req, res, next) {
  const { ...userProps } = req.body;
  return User.create({ ...userProps })
    .then((users) => res.status(201).send(users))
    .catch((err) => next(err));
}

function getUserInfo(req, res, next) {
  return User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
}

function updateUser(updateData) {
  return (req, res, next) => {
    User.findByIdAndUpdate(
      '6470bafccb15655b6a8a4727',
      updateData(req),
      { new: true, runValidators: true },
    )
      .then(() => {
        res.status(200).send(req.body);
      })
      .catch((err) => next(err));
  };
}

const updateProfile = updateUser((req) => ({ name: req.body.name, email: req.body.email }));

module.exports = { createTestUser, getUserInfo, updateProfile };
