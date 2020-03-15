var fetch = require('node-fetch');
var config = require('../config')
var alarmCtrl = {};

alarmCtrl.getAlarms = (req, res) => {
    var options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.grafana_config.apikey
        }
    }
    var url = 'http://' + config.grafana_config.host + ':' + config.grafana_config.port + '/api/alerts';
    return fetch(url, options)
        .then(res => res.json())
        .then(alarms => res.send(alarms))
}

module.exports = alarmCtrl;