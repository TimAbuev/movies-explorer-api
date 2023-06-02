const router = require('express').Router();
const { celebrate } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/usersControllers');
const { signupUserSchema, signinUserSchema } = require('../models/userSchema');
const auth = require('../middlewares/auth');
const clearJwtCookie = require('../middlewares/clearJwtCookie');

router.post('/signup', celebrate({ body: signupUserSchema }), createUser);
router.post('/signin', celebrate({ body: signinUserSchema }), login);
router.use(auth);
router.get('/signout', clearJwtCookie);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
