const express = require ('express');
const connectDB = require ('./config/db')


const app = express();

//Connect to the Database
connectDB();

//Init Middleware for body parser json
app.use(express.json ({ extended:false }))

//Samaple API Call
app.get('/', (req, res) => res.send('API Running'))

//Define Routes
//User Route
app.use('/api/users', require('./routes/api/users'))

//Profile Route
app.use('/api/profile', require('./routes/api/profile'))

//Post Route
app.use('/api/post', require('./routes/api/post'))

//Auth Route
app.use('/api/auth', require('./routes/api/auth'))


//run the Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))