const router = require('express').Router();
const { userRegister, tokenCheck, userLogin } = require('../controllers/authController');


router.post('/register', userRegister)
router.post('/tokenCheck', tokenCheck);
router.post('/login', userLogin);


module.exports = router;