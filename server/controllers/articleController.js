const User = require('../models/user')
const Article = require('../models/article')
const checkDate = require('../helpers/checkarticleDate')

class articleController {
    //create article
    static create(req,res) {
        console.log("Cek Input", req.body)

        Article.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            articleuserid: req.body.userId
        })
            .then(articlelist => {
                let newArticle = articlelist

                User.findOneAndUpdate({
                    _id: articlelist.articleuserid
                }, {$push: {listsArticle: articlelist._id}})
                .then(user => {
                    console.log("Hasil push new todo:", user)
                    res.status(200).json({
                        msg: 'Articlelist successfully created',
                        data: newArticle
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        msg: 'ERROR Create Todolist: ',error
                    })
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'ERROR Create Todolist: ',error
                })
            })
    }

    static displayListArticleByUserId (req,res) {
        User.find({
            articleuserid: req.loggedInUser._id
        })
        .then(articlelists => {
            let listArticle = articlelists

            //get all articles
            Article.find({})
            .then(lists => {
                let completedArticle = 0
                let incompleteArticle = 0
                lists.forEach(article => {
                    if(article.status == 'COMPLETE') {
                        completedArticle +=1
                    } else if (article.status == 'INCOMPLETE') {
                        incompleteArticle +=1
                    }
                })
                res.status(200).json({
                    msg: `List Article by user ${req.loggedInUser.email}`,
                    data: listArticle,
                    globalcomplete: completedArticle,
                    globalincomplete: incompleteArticle
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    msg: 'ERROR Populate ArticleList after create: ',error
                })        
            })
        })
        .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Display list of Article ', error
            })
        })       
    }

    static displayIndividualArticle (req,res) {
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            res.status(200).json ({
                msg: "Detail Article",
                data: article
            })
        })
        .catch (error => {
            res.status(error).json({
                msg: 'ERROR Display details of Article ',error
            })
        })
    }

    static editIndividualArticle (req,res) {
        Article.findOne({
            _id: req.params.id
        })
        .then (article => {
            let editDate = checkDate(req.body.updatedAt)
            Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                articleuserid: req.loggedInUser._id
            }, {new: true})
            .then(articleupdate => {
                console.log("Hasil Edit", )
                res.status(200).json ({
                    msg: "Article has been updated",
                    data: articleupdate
                })
            })
            .catch (error => {
                res.status(500).json({
                    msg: 'ERROR: ',error
                })
            })
            
        })
        .catch(error=>{
            res.status(500).json({
                msg: 'ERROR in finding your article to edit ',error
            }) 
        })
    }

    //delete article
    static deleteIndividualArticle(req,res) {
        Article.findOne({
            _id: req.params.id
        })
        .then(articlelist =>{
            Article.findOneAndUpdate({
                _id:req.params.id
            }, {$pull: {listsArticle: articlelist._id}})
            .then(articletodelete => {
                Article.findOneAndDelete({
                    _id: req.params.id
                })
                .then(articledelete => {
                    res.status(200).json({
                        msg: 'Article has been deleted',
                        data: articletodelete
                    })
                })
                .catch (error => {
                    res.status(500).json({
                        msg: "Error Delete Article", error
                    })
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'ERROR removing article from user ',error
                })
            })
        })
        .catch( error =>{
            res.status(500).json({
                msg: 'ERROR finding articles to delete ',error
            })
        })
    }
}

module.exports = articleController;