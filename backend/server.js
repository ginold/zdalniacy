require('dotenv').config() // puts .env variables to process.env

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors())
app.use(express.json())

const jobsRouter = require('./routes/jobs');
app.use('/jobs', jobsRouter);
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/lessons', require('./routes/lessons'));
app.use('/unlockedlessons', require('./routes/unlockedLessons'));


process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
});

app.listen(port, () => {
    console.log(`server runnin at ${port}!`)
})
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.openUri(uri, { useNewUrlParser: true, useUnifiedTopology: true })
