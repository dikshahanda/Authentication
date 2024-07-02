
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
// mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const Productdata = "mongodb+srv://admin:admin@cluster0.gnx9tuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(Productdata);


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});






