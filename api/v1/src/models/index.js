const { Product } = require('./product/product')
const { User } = require('./user/user')


module.exports = {
    'users': 'db_users',
    'products': Product,
    'users': User
}