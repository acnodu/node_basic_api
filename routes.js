const express = require('express')

const router = express.Router()
const auth = require('./libraries/lib_auth')

router.get('/', auth, (req, res) =>{
    console.log('ok')
    res.end('ok')
});

module.exports = router;