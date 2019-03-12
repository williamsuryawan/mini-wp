const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {type: String},
    content: {type: String},
    status: {type: String},
    articleuserid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
        timestamps: true
})

const Articlelist = mongoose.model('Articlelist', ArticleSchema)

module.exports = Articlelist