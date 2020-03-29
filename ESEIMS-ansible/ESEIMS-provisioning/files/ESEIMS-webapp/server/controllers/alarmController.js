var fetch = require('node-fetch');
var config = require('../config')
var alarmCtrl = {};

alarmCtrl.getAlarms = (req, res) => {
    var url = 'http://' + config.grafana_config.username + ':' + config.grafana_config.password + '@' + config.grafana_config.host + ':' + config.grafana_config.port + '/api/alerts';
    return fetch(url)
        .then(res => res.json())
        .then(alarms => res.send(alarms))
}

module.exports = alarmCtrl;
