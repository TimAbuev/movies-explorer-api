const router = require('express').Router();
const { celebrate } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/usersControllers');
const { signupUserSchema, signinUserSchema } = require('../models/userSchema');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.post('/signup', celebrate({ body: signupUserSchema }), createUser);
router.post('/signin', celebrate({ body: signinUserSchema }), login);

module.exports = router;
