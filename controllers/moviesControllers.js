const Movie = require('../models/movieSchema').movieSchema;

function createMovie(req, res, next) {
  return Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => Movie.populate(movie, { path: 'owner' }))
    .then((m) => res.status(201).send(m))
    .catch((err) => next(err));
}

function getMovies(req, res, next) {
  return Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById({ _id: movieId })
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (userId !== movie.owner.toString()) {
        console.log(`req.user._id = ${typeof userId}; card.owner = ${typeof movie.owner}`);
        throw new OtherCardError();
      }
      return Movie.deleteOne({ _id: movieId });
    })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => next(err));
}

module.exports = { createMovie, getMovies, deleteMovie };
