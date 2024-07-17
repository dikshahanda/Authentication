const express = require('express');
const multer = require('multer');
const router = express.Router();
const { register, login } = require('../controller/auth');
const { products } = require('../controller/products');
const { verifyToken } = require('../middleware/verifytokendata');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, (file.fieldname + '-' + uniqueSuffix)+'.png')
    }
  })
  
  const upload = multer({ storage: storage })


  router.post('/register', register);
router.post('/login', login);
router.post('/products', products);
router.post('/upload', upload.single('file'), products);

module.exports = router;


