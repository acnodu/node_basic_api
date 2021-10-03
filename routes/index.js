const express = require('express')
const router = express.Router()

const { user } = require('./includes')

router.route('/login').post(user.login)
router.route('/me').get(user.auth, user.infos)           

module.exports = router;