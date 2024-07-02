const User = require('../models/User');

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = user.generateToken();
    return res.status(201).json({ token, user: { username: user.username } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Username already exists' });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = user.generateToken();
    res.json({ token, user: { username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login };