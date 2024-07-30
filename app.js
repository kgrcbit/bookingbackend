const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 10000;
const MONGOURI = process.env.MONGOURI || 'mongodb+srv://sportscbit:wZokJ2Ug0coojB8J@sport-cbit.79n6t5u.mongodb.net/mydb?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on('error', (err) => {
  console.log("Error connecting to MongoDB:", err);
});

// Load models
require('./models/user');
require('./models/post');

// Middleware
app.use(cors({
  origin: 'https://bcbcbit1.onrender.com' // Your frontend URL
}));
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/bookings', require('./routes/bookings'));
app.use('/user', require('./routes/user'));

// Serve static files from the frontend build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './bookingfrontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './bookingfrontend/build', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
