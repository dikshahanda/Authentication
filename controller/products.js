const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const multer = require('multer');

const products = async (req, res, next) => {
  try {
    console.log(req.file.originalname);
    console.log(req.file.mimetype);
    console.log(req.file.buffer);

    console.log(`Uploaded file: ${req.file.filename}`);
    //Logic
    return res.status(200).json({ message: 'Your products successfully added !!' });
  }
  catch (error) {
    return res.status(500).json({ error: 'Something Went Wrong !!!' });
  }
};



module.exports = { products };