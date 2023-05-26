const router = require('express').Router();
const { createTestUser, getUserInfo, updateProfile } = require('../controllers/usersControllers'); // важно соблюдать порядок импортируемых объектов

router.post('/me', createTestUser);
router.get('/me', getUserInfo);
router.patch('/me', updateProfile);

module.exports = router;
