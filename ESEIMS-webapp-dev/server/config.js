require('dotenv').config();

var config = {}

config.port = process.env.PORT || 3000

var db_config = {}

db_config.host = process.env.DB_HOST || 'myhost'
db_config.port = process.env.DB_PORT || ''
db_config.user = process.env.DB_USER || 'test'
db_config.password = process.env.DB_PASSWORD || ''
db_config.database = process.env.DB_DATABASE || 'database'

config.db_config = db_config;

var grafana_config = {}

grafana_config.host = process.env.GRAFANA_HOST || 'somehost'
grafana_config.port = process.env.GRAFANA_PORT || 3001
grafana_config.username = process.env.GRAFANA_USERNAME || ''
grafana_config.password = process.env.GRAFANA_PASSWORD || ''

config.grafana_config = grafana_config;

module.exports = config