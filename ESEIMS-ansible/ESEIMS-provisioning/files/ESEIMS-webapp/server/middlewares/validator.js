const { body } = require('express-validator');

// validations of register data
exports.checkDataRegister = [
    body('name')
    .isString()
    .notEmpty()
    .isLength({ max: 32 }),
    body('surname')
    .isString()
    .notEmpty()
    .isLength({ max: 50 }),
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

// validations of login data
exports.checkDataLogin = [
    body('email')
    .isEmail(),
    body('password')
    .notEmpty(),
];

// validations of user data when modified
exports.checkUserData = [
    body('name')
    .isString()
    .notEmpty()
    .isLength({ max: 32 }),
    body('surname')
    .isString()
    .notEmpty()
    .isLength({ max: 32 }),
    body('email')
    .isEmail()
    .normalizeEmail()
    .contains('@esei.uvigo.es')
    .isLength({ min: 17, max: 32 }),
    body('password')
    .if(body('password').exists()) // if field password exists it means the password was changed, so we validate the new password
    .isLength({ min: 8 }),
    body('dni')
    .isIdentityCard('ES'), // if we set it to 'ES' it will check Spanish DNIs otherwise using 'any' -> ['ES', 'zh-TW', 'he-IL']
];

// validations of ticket data
exports.checkTicket = [
    body('title')
    .isString()
    .notEmpty()
    .isLength({ max: 100 }),
    body('description')
    .isString()
    .notEmpty()
    .isLength({ max: 400 }),
];

// validations for new comment
exports.checkComment = [
    body('message')
    .isString()
    .notEmpty()
    .isLength({ max: 400 }),
];