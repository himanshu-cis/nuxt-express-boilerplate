const { Article } = require('./blog/article')
const { User } = require('./user/user')


module.exports = {
    'users': 'db_users',
    'article': Article,
    'users': User
}