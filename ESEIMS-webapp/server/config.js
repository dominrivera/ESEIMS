var config = {}

config.port = 3000


var db_config = {}

db_config.host = 'localhost'
// db_config.port = 
db_config.user = 'root'
db_config.password = ''
db_config.database = 'eseims'

config.db_config = db_config;

module.exports = config