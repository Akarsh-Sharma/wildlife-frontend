const express = require('express'),
router = express.Router() , 
BackendSignIn = require('../controllers/BackendSignIn')

router.get('/', BackendSignIn.SignIn)

module.exports = router