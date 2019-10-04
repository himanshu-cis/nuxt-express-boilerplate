const { UserMiddleware, GuestMiddleware } = require('../../middleware/passport')
const express = require('express');
const router = express();
const { get, create } = require('../../controllers/blog/index.controller')

router.get('/', GuestMiddleware, get);
router.post('/', UserMiddleware, create);

module.exports = router;