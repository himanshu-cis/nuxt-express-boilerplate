const express = require('express');
const { errorHandler } = require('../middleware');
const { login, register } = require('../controllers/auth/auth.controller');

const router = express();
// register api points
router.use('/c', require('./common'));
router.post('/auth/login', login);
router.post('/auth/register', register);

// catch api all errors
router.use(errorHandler);

module.exports = router;