const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/usersControllers');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
