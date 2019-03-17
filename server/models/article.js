const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {type: String},
    text: {type: String},
    status: {type: String},
    link: {type: String},
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