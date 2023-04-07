
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const farm = require('./routes/farm');

//load env vars
dotenv.config({path:'./config/config.env'});

//connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

app.use('/api/v1/farm',farm);

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
