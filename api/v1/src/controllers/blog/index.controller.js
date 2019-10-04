const { Article } = require('../../models/blog/article')

module.exports = (() => {

    this.get = (req, res, next) => {

        let {query} = req;

        if(query.id) {
            return Article.findOne({
                _id: query.id
            })
            .populate('createdBy')
            .then(doc => {
                return res.json({
                    status: true,
                    payload: doc
                })
            })
            .catch(next)
        }

        return Article.find()
            .populate('createdBy')
            .then(docs => {
                return res.json({
                    status: true,
                    payload: docs
                })
            })
            .catch(next)
    }

    this.create = (req, res, next) => {
        let {title, content, tags} = req.body;

        if(!title || !content) {
            next(new Error('All fields are required!'));
        }

        return Article.create({
            title, content, createdBy: req.user._id, tags: !tags ? [] : tags.split(',').map(val => val.replace(/\s/g, '')),
        })
        .then(doc => {
            if(!doc) {
                throw new Error('Something went wrong!');
            }

            doc.populate('createdBy');

            return res.json({
                status:true,
                payload: doc
            })
        })
        .catch(next)
    }

    return this;
})()