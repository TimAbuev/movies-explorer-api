const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovie, getMovies, deleteMovie } = require('../controllers/moviesControllers'); // важно соблюдать порядок импортируемых объектов
const { createMovieSchema, paramSchema } = require('../models/movieSchema');

router.post('/', celebrate({ body: createMovieSchema }), createMovie);
router.get('/', getMovies);
router.delete('/:movieId', celebrate({ params: paramSchema }), deleteMovie);

module.exports = router;
