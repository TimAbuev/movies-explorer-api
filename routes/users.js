const router = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/usersControllers'); // важно соблюдать порядок импортируемых объектов
const auth = require('../middlewares/auth');

router.get('/me', auth, getUserInfo);
router.patch('/me', auth, updateProfile);

module.exports = router;
