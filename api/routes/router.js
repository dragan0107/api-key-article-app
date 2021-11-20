const router = require('express').Router();
const { userRegister, tokenCheck, userLogin, getUser } = require('../controllers/authController');
const { apiKeyGenerator, getApiKeys, deleteKey } = require('../controllers/api_keyController');
const { addArticle } = require('../controllers/articleController');

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


module.exports = router;