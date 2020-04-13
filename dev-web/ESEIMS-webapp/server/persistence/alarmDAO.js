const dbConnection = require('../databaseConnection');
const queries = require('../queries');
const Alarm = require('../models/alarm');

Alarm.getAlarms = function (result) {
    dbConnection.query(queries.select_alarms, function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Alarm.addAlarm = function(alarm, result){
    dbConnection.query(queries.insert_alarm, alarm, function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

Alarm.updateAlarm = function(id, alarm, result){
    dbConnection.query(queries.update_alarm, [alarm.status, alarm.assignment, alarm.modified, id], function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Alarm.deleteAlarm = function(id, result){
    dbConnection.query(queries.delete_alarm, [id], function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Alarm;
