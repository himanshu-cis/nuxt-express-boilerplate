const { login, register } = require('../../controllers/auth/auth.controller');
const { UserMiddleware } = require('../../middleware/passport')
const express = require('express');
const router = express();

router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/auth/user', UserMiddleware, (req, res, next) => {
    return res.json({
        status: true,
        user: req.user
    })
});

module.exports = router;