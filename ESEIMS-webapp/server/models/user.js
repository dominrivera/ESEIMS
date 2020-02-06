var User = function (user) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.dni = user.dni;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
};

module.exports = User;