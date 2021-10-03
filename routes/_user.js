const jwt = require('jsonwebtoken');
const send = require('./_send')

const { user } = require('./../libraries')

let _user = {}

_user.login = async (req, res) => {
    if( ! req.body || ! req.body.username || ! req.body.password ){
        return send(res, {
            error: 'User/Password not found.'
        }, 400)
    }

    if( req.body.username != 'acnodu' || req.body.password != 'acnodu' ){
        return send(res, {
            error: 'Bad Username / Password.'
        }, 403)
    }

    let data = {
        id: 2,
        username: req.body.username,
        iat: Math.floor(Date.now() / 1000) - 30,
    }

    jwt.sign(data, 'secret', {algorithm: 'HS512'}, (err, token) => {
        send(res, {
            _msg: "Authentification ok !",
            token: token
        })
    })
}


_user.infos = async (req, res) => {
     user.info_by_id(req.user.id, true).then( data => {
        send(res, data)
    })
}

module.exports = _user