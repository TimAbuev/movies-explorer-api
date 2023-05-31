const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserInfo, updateProfile } = require('../controllers/usersControllers'); // важно соблюдать порядок импортируемых объектов
const auth = require('../middlewares/auth');
const { profileUserSchema } = require('../models/userSchema');

router.get('/me', auth, getUserInfo);
router.patch('/me', auth, celebrate({ body: profileUserSchema }), updateProfile);

module.exports = router;
