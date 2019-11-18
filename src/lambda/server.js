require('dotenv').config() // puts .env variables to process.env

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors())
app.use(express.json())

app.use('/lessons', require('./routes/lessons'));
app.use('/jobs', require('./routes/jobs'));
app.use('/exams', require('./routes/exams'));
app.use('/tasks', require('./routes/tasks'));
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/unlockedlessons', require('./routes/unlockedLessons'));


process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

app.listen(port, () => {
    console.log(`server runnin at ${port}!`)
})
const db = mongoose.connection;

db.openUri(uri, { useNewUrlParser: true, useUnifiedTopology: true })
