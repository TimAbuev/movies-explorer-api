const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovie, getMovies, deleteMovie } = require('../controllers/moviesControllers'); // важно соблюдать порядок импортируемых объектов
const auth = require('../middlewares/auth');
const { createMovieSchema, paramSchema } = require('../models/movieSchema');

router.post('/', auth, celebrate({ body: createMovieSchema }), createMovie);
router.get('/', auth, getMovies);
router.delete('/:movieId', auth, celebrate({ params: paramSchema }), deleteMovie);

module.exports = router;
