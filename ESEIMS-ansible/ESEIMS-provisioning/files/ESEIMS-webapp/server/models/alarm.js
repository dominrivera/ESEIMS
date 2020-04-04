var Alarm = function (alarm) {
    this.id = alarm.id;
    this.level = alarm.type;
    this.host = alarm.host;
    this.laboratory = alarm.laboratory;
    this.status = alarm.status;
    this.assignment = alarm.assignment;
    this.created = alarm.created;
    this.modified = alarm.modified;
};

module.exports = Alarm;