const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/moviesControllers'); // важно соблюдать порядок импортируемых объектов
const auth = require('../middlewares/auth');

router.post('/', auth, createMovie);
router.get('/', auth, getMovies);
router.delete('/:movieId', auth, deleteMovie);

module.exports = router;
