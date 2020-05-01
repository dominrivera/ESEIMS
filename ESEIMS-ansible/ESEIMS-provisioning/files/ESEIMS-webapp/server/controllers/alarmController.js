var Alarm = require('../persistence/alarmDAO');
var alarmCtrl = {};

// returns all the alarms
alarmCtrl.listAlarms = function (req, res) {
    Alarm.getAlarms(function (err, alarms) {
        if (err)
            res.status(404);
        res.json(alarms);
    });
};

// save alarms from kapacitor
alarmCtrl.saveAlarm = function (req, res) {
    // Only parse alarms with level warning or critical, not interesting to save alarms with level OK
    if (req.body.level == 'WARNING' || req.body.level == 'CRITICAL') {
        var alarm = req.body
        var new_alarm = {
            "type": alarm.id,
            "value": alarm.message,
            "level": alarm.level,
            "host": JSON.stringify(alarm.data.series[0].tags.host),
            "laboratory": JSON.stringify(alarm.data.series[0].tags.laboratory),
            "assignment": ''
        }
        new_alarm.host = new_alarm.host.slice(1, -1);
        new_alarm.laboratory = new_alarm.laboratory.slice(1, -1);
        if (!alarm) {
            return res.status(400).send({ error: true, message: 'Error saving alarm' });
        } else {
            // adding custom fields
            new_alarm.created = new Date();
            new_alarm.modified = new Date();
            new_alarm.status = 'open';
            Alarm.addAlarm(new_alarm, function (err, new_alarm) {
                if (err)
                    res.send(err);
                res.json(new_alarm);
            });
        }
    }
};

// edit alarm by aid
alarmCtrl.editAlarm = function (req, res) {
    var alarm_edit = new Alarm(req.body);
    alarm_edit.modified = new Date();
    Alarm.updateAlarm(req.params.id, alarm_edit, function (err, alarm) {
        if (err)
            res.send(err);
        res.json(alarm);
    });
};

// removes alarm by id
alarmCtrl.removeAlarm = function (req, res) {
    Alarm.deleteAlarm(req.params.id, function (err, alarm) {
        if (err)
            res.send(err);
        res.json({ message: 'Alarm removed' });
    });
};

module.exports = alarmCtrl;
