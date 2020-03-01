var fetch = require('node-fetch');
var config = require('../config')
var alarmCtrl = {};

alarmCtrl.getAlarms = () => {
    var options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.grafana_config.apikey
        }
    }
    var url = 'http://' + config.grafana_config.host + ':' + config.grafana_config.port + '/api/alerts';
    return fetch(url, options)
        .then(res => res.json())
        .then(alerts => console.log(alerts))
}

module.exports = alarmCtrl;