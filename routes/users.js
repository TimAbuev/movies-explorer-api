const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserInfo, updateProfile } = require('../controllers/usersControllers'); // важно соблюдать порядок импортируемых объектов
const { profileUserSchema } = require('../models/userSchema');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({ body: profileUserSchema }), updateProfile);

module.exports = router;
