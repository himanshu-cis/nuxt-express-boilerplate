const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    title: {
        type: String,
        required: [true],
    },
    content: {
        type: String,
    },
    tags: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now  
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    }
});


const Article = mongoose.model('article', schema);

module.exports = {
    Article
}