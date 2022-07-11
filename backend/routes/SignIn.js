const express = require('express'),
router = express.Router() , 
BackendSignIn = require('../controllers/BackendSignIn')

router.post('/', BackendSignIn.SignIn)

module.exports = router