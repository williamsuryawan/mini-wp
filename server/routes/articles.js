const express = require('express');
const router = express();
const ArticleController = require('../controllers/articleController');
const Authentication = require('../middlewares/authentication.js')
/* GET users listing. */

// router.post('/register', TodoController.create);

router.use(Authentication)
router.post('/register', ArticleController.create);
router.get('/myarticle', ArticleController.displayListArticleByUserId)
router.get('/myarticle/:id', ArticleController.displayIndividualArticle)

router.put('/edit/:id', ArticleController.editIndividualArticle)
router.delete('/delete/:id', ArticleController.deleteIndividualArticle)


module.exports = router;