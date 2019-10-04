const express = require('express');
const router = express();
const { errorHandler } = require('../middleware');

router.use(require('./auth'));
router.use('/blog', require('./blog'));

router.use(errorHandler);

module.exports = router;