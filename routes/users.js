const router = require('express').Router();
const { createTestUser } = require('../controllers/usersControllers'); // важно соблюдать порядок импортируемых объектов

router.post('/me', createTestUser);

module.exports = router;
