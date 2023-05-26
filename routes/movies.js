const router = require('express').Router();
const { createTestMovie } = require('../controllers/moviesControllers'); // важно соблюдать порядок импортируемых объектов

router.post('/', createTestMovie);

module.exports = router;
