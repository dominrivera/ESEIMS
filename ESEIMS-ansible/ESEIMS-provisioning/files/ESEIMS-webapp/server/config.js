require('dotenv').config();

var config = {}

config.port = process.env.PORT || 3000
config.SECRETKEY = process.env.SECRETKEY || 'mysecretkey'

var db_config = {}

db_config.host = process.env.DB_HOST || 'localhost'
db_config.port = process.env.DB_PORT || ''
db_config.user = process.env.DB_USER || 'root'
db_config.password = process.env.DB_PASSWORD || ''
db_config.database = process.env.DB_DATABASE || 'eseims'

config.db_config = db_config;

module.exports = config
