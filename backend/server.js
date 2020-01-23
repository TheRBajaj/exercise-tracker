//requiring express and cors for backend
const express = require('express');
const cors = require('cors');
//requiring mongoose (allows us to connect to our database)
const mongoose = require('mongoose');

//dotenv configuration (allows us to have our environment variables in the dotenv file)
require('dotenv').config();

//allows us to create our express web server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
//allows us to parse JSON files
app.use(express.json());

//backend code to mongoDB
//database uri (where our database is)
const uri = process.env.ATLAS_URI;
//connect to our MongoDB database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected successfully");
})

//require and use our routes for DB models (for CRUD)
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//allows us to listen on port (runs the server)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})