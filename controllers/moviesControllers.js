const Movie = require('../models/movieSchema').movieSchema;
const errorHandler = require('../middlewares/errorHandler');

const { NotFoundError } = require('../errors/NotFoundError');
// const { OtherMovieError } = require('../errors/OtherMovieError');

function createMovie(req, res, next) {
  return Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => Movie.populate(movie, { path: 'owner' }))
    .then((movie) => res.status(201).send(movie))
    .catch((error) => { errorHandler(error, req, res, next); });
}

function getMovies(req, res, next) {
  const ownerId = req.user._id;
  return Movie.find({ owner: ownerId })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
}

async function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  // const userId = req.user._id;

  try {
    const movie = await Movie.findOne({ id: movieId }).orFail(new NotFoundError('Фильм не найден'));

    // if (userId !== movie.owner.toString()) {
    //   console.log(`req.user._id = ${typeof userId}; movie.owner = ${typeof movie.owner}`);
    //   throw new OtherMovieError();
    // }

    await movie.deleteOne();

    res.status(200).send(movie);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = { createMovie, getMovies, deleteMovie };
