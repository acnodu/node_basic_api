const { logger } = require('./')

let user = {}

user.login = async (username, password) => {
    logger.debug('> user.login')

    if( username != 'acnodu' || password != 'acnodu' ){
        return false
    }

    let id = 2

    return await user.info_by_id(id)
}


user.info_by_id = async (id, all=false) => {
    logger.debug('> user.info_by_id')

    let data = {
        id: id,
        is_admin: true,
        username: 'acnodu',
        first_name: 'Baguette',
        last_name: 'Vin rouge',
        mail: 'beret@france.fr'
    }

    if( all ){
        data = {
            ...data,
            is_rich: true
        }
    }

    return data
}

module.exports = user