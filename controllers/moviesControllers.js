const Movie = require('../models/movieSchema').movieSchema;

function createTestMovie(req, res, next) {
  const { ...userProps } = req.body;
  return Movie.create({ ...userProps })
    .then((m) => res.status(201).send(m))
    .catch((err) => next(err));
}

module.exports = { createTestMovie };
