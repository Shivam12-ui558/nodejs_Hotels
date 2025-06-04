const mongoose = require('mongoose');
require('dotenv').config();

// define mongodb connection URL

// const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = process.env.MONGODB_URL;


// set up MongoDB connection
mongoose.connect(mongoURL,{
    useUnifiedTopology: true
})

// get the default coneection
//Mongoose maintains a default connection object representings the MongoDB connection.
const db = mongoose.connection;
//Define event listeners for database connection
db.on('connected', () =>{
    console.log('connected to MongoDB server');
})

db.on('disconnected', () =>{
    console.log('MongoDB disconnected');
})

db.on('error', (err) =>{
    console.error(' MongoDB connection error:',err);
})
// export the database connection
module.exports = db;