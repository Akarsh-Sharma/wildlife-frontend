const express = require('express'),
router = express.Router() , 
SignIn = require('../controllers/SignIn')

router.get('/', SignIn.SignIn)

module.exports = router