const express = require('express');
const AuthController = require('../controllers/AuthController');
const ValidateMiddleware = require('../middleware/validate');
const userSchema = require('../schemas/userSchema');
const router = express.Router();

router.post('/register', ValidateMiddleware.validate(userSchema), AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;