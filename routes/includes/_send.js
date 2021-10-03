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
}