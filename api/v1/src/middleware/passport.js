const { User } = require('../models/user/user');
const jwt = require('jsonwebtoken');
const { SECRET, USER_TYPES } = require('../../config');

const login = async function ({ id }) {
    return User.findById(id)
        .then(doc => {
            if (!doc) throw new Error('Invalid token!');
            return doc;
        })
        .catch(err => {
            throw err
        });
}


module.exports = {
    UserMiddleware: async (req, res, next) => {
        try {
            if (!req.get('Authorization')) {
                throw new Error('Authorization token is missing!');
            }

            let jwt_payload = jwt.verify(req.get('Authorization').replace('Bearer ', ''), SECRET);

            if (!jwt_payload) {
                throw new Error('This token is either expired or is invalid!');
            }

            let user = await login(jwt_payload)
            req.user = user;
            req.type = USER_TYPES.USER;
            next();
        } catch (err) {
            next(err, false)
        }
    },
    GuestMiddleware: (req, res, next) => {
        req.type = USER_TYPES.GUEST
        next()
    },
    AdminMiddleware: async (req, res, next) => {
        try {

            let jwt_payload = jwt.verify(req.get('Authorization').replace('Bearer ', ''), SECRET);

            let user = await login(jwt_payload)
            req.user = user;
            req.type = USER_TYPES.ADMIN
            next()
        } catch (err) {
            next(err, false)
        }
    }

};