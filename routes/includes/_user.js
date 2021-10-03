const jwt = require('jsonwebtoken');

const { send } = require('./')
const { config, user } = require(process.cwd() + '/libraries')

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

    jwt.sign(data, config.jwt.secret, {
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expiration
    }, (err, token) => {
        send(res, {
            _msg: "Authentification ok !",
            token: token
        })
    })
}

_user.auth = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'].split(' ')[1] || false

    if( ! token ){
        return send( res, {
            error: 'Token not found.'
        }, 401)
    }

    jwt.verify(token, config.jwt.secret, { algorithms: config.jwt.algorithm }, (err, data) => {
        if( err ){
            return send( res, {
                error: 'Invalid token. ('+ err.message +')'
            }, 401)
        }

        req.user = data

        next()
    })
}

_user.infos = async (req, res) => {
     user.info_by_id(req.user.id, true).then( data => {
        send(res, data)
    })
}

module.exports = _user