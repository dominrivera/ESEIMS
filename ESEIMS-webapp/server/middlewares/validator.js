const { check, body } = require('express-validator');

exports.checkData = [
    body('name')
    .isString(),
    body('surname')
    .isString(),
    body('email')
    .isEmail()
    .normalizeEmail()
    .contains('@esei.uvigo.es'),
    body('password')
    .isLength({ min: 8 }),
    body('dni')
    .isIdentityCard('ES'),
];