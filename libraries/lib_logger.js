const { config } = require('./')

let logger = {}

logger.debug = async (t) => {
    if( config.app.debug ){
        console.log(t)
    }
}

logger.log = async (t) => {
    console.log(t)
}

module.exports = logger