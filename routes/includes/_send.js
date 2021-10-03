const { logger } = require(process.cwd() + '/libraries')

module.exports = ( res, data={}, code=200 ) => {
    let status = (data.error) ? false : true
    let msg = (data.error) ? data.error : (data._msg) ? data._msg : ''
        
    data = (data.error) ? '' : data

    let _data = {
        _metadata:{
            code: code,
            status: status,
            time: Math.round(new Date().getTime() / 1000),
        }
    }

    if( data ){
        _data['data'] = data
    }

    if( msg ){
        _data._metadata['message'] = msg
    }

    if( data._msg ){
        delete data._msg
    }

    res.status(code).json(_data).end()

    if( _data.data ){
        if( _data.data.token )   { _data.data.token    = 'token'    }
        if( _data.data.password ){ _data.data.password = 'password' }
        if( _data.data.mail )    { _data.data.mail     = 'mail'     }
    }

    logger.debug('Response [' + code + '] : ' + JSON.stringify(_data, null, 2))
}