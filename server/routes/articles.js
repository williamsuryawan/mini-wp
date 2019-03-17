const express = require('express');
const router = express();
const ArticleController = require('../controllers/articleController');
const Authentication = require('../middlewares/authentication.js')
const images = require('../helpers/images')
/* GET users listing. */

// router.post('/register', TodoController.create);

router.use(Authentication)
router.post('/register', images.multer.single('image'), images.sendUploadToGCS, ArticleController.create);
router.get('/myarticle', ArticleController.displayListArticleByUserId)
router.get('/myarticle/:id', ArticleController.displayIndividualArticle)

router.put('/edit/:id', images.multer.single('image'), images.sendUploadToGCS, ArticleController.editIndividualArticle)
router.delete('/delete/:id', ArticleController.deleteIndividualArticle)


module.exports = router;