// server.js
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
  res.send('Hello! Welcome to Our Hotel')
})


// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItem = require('./routes/menuItemRoutes');
// use the Routers
app.use('/person', personRoutes);
app.use('/MenuItem', menuItem);


app.listen(3000, () => {
  console.log('listening on port 3000');
})