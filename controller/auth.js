const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const validationSchema = Joi.object().keys({
  username: Joi.string().max(10).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required(),
  email: Joi.string().email()
});                

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    const username = req.body.username;
    const password = req.body.password;

    const result = validationSchema.validate({ username, password });

    console.log(result);

    if (result.error) {
      return res.status(400).send({ error: result.error.details });
    }

    else {
      return res.status(201).send({ message: "registered successfully !!" });

    }


    // let emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    // if (!emailPattern.test(req.body.username)) {
    //   return res.status(500).json({ error: "Email is not valid." })
    // }


    // if (req.body.username === "" || !req.body.username) {
    //   return res.status(500).json({ error: "username cannot be empty" });
    // }




    //Check if User Exist
    // if (existingUser) {
    //   return res.status(400).json({ error: 'Username already exists' });
    // }
    // //Check if user is not Exist
    // else {
    //   const user = new User(req.body);
    //   bcrypt.hash(user.password, 10, async function (err, hash) {
    //     if (err) {
    //       return next(err);
    //     }
    //     user.password = hash;
    //     next();
    //     await user.save();
    //   });
    //   return res.status(201).json({ message: "user register successfully" });
    // }
  }
  //If Any Error Comes then Throw in Catch
  catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something Went Wrong !!!' });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log(user);

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ _id: user._id, usernamedata: user.username }, "ABCD", { expiresIn: '1h' });
    return res.json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login };