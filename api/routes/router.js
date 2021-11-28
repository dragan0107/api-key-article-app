const router = require('express').Router();
const { userRegister, tokenCheck, userLogin, getUser } = require('../controllers/authController');
const { apiKeyGenerator, getApiKeys, deleteKey, verifyAPI } = require('../controllers/apiKeyController');
const { addArticle, getAllArticles, commentArticle, deleteArticle, updateArticle } = require('../controllers/articleController');

//User routes.
router.post('/register', userRegister)
router.post('/tokenCheck', tokenCheck);
router.post('/login', userLogin);
router.post('/getUser', getUser);

//API key routes
router.post('/deleteKey', deleteKey);
router.post('/generateKey', apiKeyGenerator);
router.post('/getKeys', getApiKeys);

//Article routes

router.post('/addArticle', addArticle)
router.get('/getArticles', getAllArticles)
router.post('/commentArticle', commentArticle)
router.delete('/deleteArticle/:artId', deleteArticle)
router.put('/updateArticle/:artId', updateArticle)
router.get('/public/getArticles', verifyAPI, getAllArticles) //Public API endpoint, accessed only with valid API key.


module.exports = router;