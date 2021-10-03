const jwt = require('jsonwebtoken');

const { send } = require('./')
const { config, logger, user } = require(process.cwd() + '/libraries')

let _user = {}

_user.login = async (req, res) => {
    logger.debug('> _user.login')

    if( ! req.body || ! req.body.username || ! req.body.password ){
        return send(res, {
            error: 'User/Password not found.'
        }, 400)
    }

    user.login(req.body.username, req.body.password).then( logged => {
        if( ! logged ){
            return send(res, {
                error: 'Username / Password invalid.'
            }, 403)
        }

        let data = {
            id: logged.id,
            username: logged.username,
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
    })
}

_user.auth = async (req, res, next) => {
    logger.debug('> _user.auth')

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
    logger.debug('> _user.infos')

    user.info_by_id(req.user.id, true).then( data => {
        send(res, data)
    })
}

module.exports = _user