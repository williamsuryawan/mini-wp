const User = require('../models/user')
const Article = require('../models/article')
// const checkDate = require('../helpers/checkarticleDate')

const Multer = require('multer')
var upload = Multer({})

class articleController {
    //create article
    static create(req,res) {
        console.log("Cek Input sebelum multer", req.body, req.file)
        
            console.log('ini req.filenya setelah multer', req.file)
            console.log("masuk sini upload post artikel", req.body)
                let obj = {
                link: req.file.cloudStoragePublicUrl,
                title: req.body.title,
                text: req.body.text,
                status: req.body.status,
                articleuserid: req.loggedInUser._id
                }

            Article.create(obj)
                .then(articlelist => {
                    let newArticle = articlelist

                    User.findOneAndUpdate({
                        _id: articlelist.articleuserid
                    }, {$push: {listsArticle: articlelist._id}})
                    .then(user => {
                        console.log("Hasil push new article:", user)
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
        console.log("masuk ke display article", req.loggedInUser)
        User.find({
            _id: req.loggedInUser._id
        })
        .populate('listsArticle')
        .then(user => {
            console.log("User ditemukan, hasil pencarian user: ", user)
            console.log("User ditemukan, hasil pencarian artikel: ", user.listsArticle)
            //get all articles by user
            Article.find({
                articleuserid: req.loggedInUser._id
            })
            .then(lists => {
                console.log("Hasil pencarian artikel: ", lists )
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
                    data: lists,
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
        console.log("Masuk ke edit artikel", req.body, req.loggedInUser, req.params.id)
        Article.findOne({
            "_id": req.params.id
        })
        .then (article => {
            // let editDate = checkDate(req.body.updatedAt)
            console.log("Hasil pencarian artikel: ", article)
            Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                title: req.body.title,
                text: req.body.text,
                status: req.body.status,
                articleuserid: req.loggedInUser._id
            }, {new: true})
            .then(articleupdate => {
                console.log("Hasil Edit", articleupdate)
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
            console.log(error)
        })
    }

    //delete article
    static deleteIndividualArticle(req,res) {
        Article.findOne({
            _id: req.params.id
        })
        .then(articlelist =>{
            console.log("Artikel yang akan diremove dan delete:", articlelist, req.loggedInUser)
            User.findOneAndUpdate({
                _id:articlelist.articleuserid
            }, {$pull: {listsArticle: articlelist._id}})
            .then(articleToDelete => {
                console.log("Hasil update user untuk delete artikel:", articleToDelete)
                Article.findOneAndDelete({
                    _id: req.params.id
                })
                .then(articleDelete => {
                    console.log("Hasil delete: ", articleDelete)
                    res.status(200).json({
                        msg: 'Article has been deleted',
                        data: articleDelete
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