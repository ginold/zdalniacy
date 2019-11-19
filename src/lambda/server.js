require('dotenv').config() // puts .env variables to process.env

const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const uri = process.env.ATLAS_URI;

app.use(cors())
app.use(express.json())

// must contain the name OF THE FILE!!!!!!!!!!! SERVER
app.use('/.netlify/functions/server/lessons', require('./routes/lessons')); // path must route to lambda
app.use('/.netlify/functions/server/jobs', require('./routes/jobs'));
app.use('/.netlify/functions/server/exams', require('./routes/exams'));
app.use('/.netlify/functions/server/tasks', require('./routes/tasks'));
app.use('/.netlify/functions/server/users', require('./routes/users'));
app.use('/.netlify/functions/server/courses', require('./routes/courses'));
app.use('/.netlify/functions/server/unlockedlessons', require('./routes/unlockedLessons'));

const db = mongoose.connection;

db.openUri(uri, { useNewUrlParser: true, useUnifiedTopology: true })


module.exports = app
module.exports.handler = serverless(app)