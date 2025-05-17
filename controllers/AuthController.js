const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const i18next = require('../config/i18n');
const userSchema = require('../schemas/userSchema');

class AuthController {
  static async register(req, res) {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { full_name, username, email, password, role, language } = req.body;
    if (!full_name || !username || !email || !password || !role) {
      return res.status(400).json({ error: i18next.t('allFieldsRequired') });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: i18next.t('userExists') });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      full_name, 
      username, 
      email, 
      password: hashedPassword, 
      role,
      language: language || 'en'
    });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: i18next.t('invalidCredentials') });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: i18next.t('invalidCredentials') });
    }
    const token = jwt.sign({ id: user._id, role: user.role, language: user.language }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.json({ message: 'Logged in' });
  }
}

module.exports = AuthController;