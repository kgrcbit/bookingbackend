const express = require('express')
const cors = require('cors');
const path = require('path');


const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 10000
const MONGOURI='mongodb+srv://sportscbit:wZokJ2Ug0coojB8J@sport-cbit.79n6t5u.mongodb.net/mydb?retryWrites=true&w=majority&appName=sport-cbit'
//const {MONGOURI} = require('./config/keys')
/ Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'bookingfrontend', 'build')));

// Handle all other requests by serving the frontend's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'bookingfrontend', 'build', 'index.html'));
});

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo!")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')



app.use(cors({
  origin: 'https://bcbcbit1.onrender.com' // Your frontend URL
}));
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/bookings'))
app.use(require('./routes/user'))




app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

