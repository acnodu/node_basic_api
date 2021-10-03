const express = require('express')
const router = express.Router()

const auth = require('./_auth')
const user = require('./_user')



router.get('/me', auth, user.infos);
router.post('/login', user.login);


module.exports = router;