// server.js
const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/',(req, res) => {
  res.send('Hello! Welcome to Our Hotel')
})






// import the router files
const personRoutes = require('./routes/personRoutes');

// use the Routers
app.use('/person', personRoutes);

// import the router files
const menuItem = require('./routes/menuItemRoutes');

// use the Routers
app.use('/MenuItem', menuItem);




app.listen(3000, () => {
  console.log('listening on port 3000');
})