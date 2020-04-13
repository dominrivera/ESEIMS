var Alarm = function (alarm) {
    this.id = alarm.id;
    this.type = alarm.type
    this.value = alarm.value
    this.level = alarm.level;
    this.host = alarm.host;
    this.laboratory = alarm.laboratory;
    this.status = alarm.status;
    this.assignment = alarm.assignment;
    this.created = alarm.created;
    this.modified = alarm.modified;
};

module.exports = Alarm;