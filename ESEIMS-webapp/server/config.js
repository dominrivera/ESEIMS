var config = {}

config.port = process.env.PORT || 3000


var db_config = {}

db_config.host = process.env.DB_HOST || 'myhost'
// db_config.port =
db_config.user = process.env.DB_USER || 'test'
db_config.password = process.env.DB_PASSWORD || ''
db_config.database = process.env.DB_DATABASE || 'database'

config.db_config = db_config;

module.exports = config
