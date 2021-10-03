const jwt = require('jsonwebtoken');
const send = require('./_send')

module.exports = (req, res, next) => {
    let token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : false
    
    if( ! token ){
        return send( res, {
            error: 'Token not found.'
        }, 401)
    }

    jwt.verify(token, 'secret', { algorithms: 'HS512' }, (err, data) => {
        if( err ){
            return send( res, {
                error: 'Invalid token. ('+ err.message +')'
            }, 401)
        }

        req.user = data

        next()
    })
};