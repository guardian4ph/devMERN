const mongoose = require('mongoose')
//for access to global variables
const config = require ('config')
const { connect } = require('http2')
//Database URI thu config access
const db = config.get('mongoURI')


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            //added to address deprecation warnings
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log('Database Connected...')
    }catch (err) {
        console.error(err.message);
        //Exit Process with failure
        process.exit(1)
    }
}

module.exports = connectDB;
