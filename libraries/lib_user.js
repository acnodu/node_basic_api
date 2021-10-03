let user = {}

user.info_by_id = async (id, all=false) => {
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