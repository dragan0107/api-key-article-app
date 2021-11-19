const router = require('express').Router();
const { userRegister, tokenCheck, userLogin } = require('../controllers/authController');
const { apiKeyGenerator, getApiKeys, deleteKey } = require('../controllers/api_keyController');


router.post('/register', userRegister)
router.post('/tokenCheck', tokenCheck);
router.post('/login', userLogin);
router.post('/generateKey', apiKeyGenerator);
router.post('/getKeys', getApiKeys);
router.post('/deleteKey', deleteKey);


module.exports = router;