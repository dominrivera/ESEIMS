const { body } = require('express-validator');

exports.checkDataRegister = [
    body('name')
    .isAlpha()
    .not().isEmpty()
    .isLength({ max: 32 }),
    body('surname')
    .isAlpha()
    .not().isEmpty()
    .isLength({ max: 32 }),
    body('email')
    .isEmail()
    .normalizeEmail()
    .contains('@esei.uvigo.es')
    .isLength({ min: 17, max: 32 }),
    body('password')
    .isLength({ min: 8, max: 20 }),
    body('dni')
    .isIdentityCard('ES'), // if we set it to 'ES' it will check Spanish DNIs otherwise using 'any' -> ['ES', 'zh-TW', 'he-IL']
];

exports.checkDataLogin = [
    body('email')
    .isEmail(),
    body('password')
    .not().isEmpty(),
];