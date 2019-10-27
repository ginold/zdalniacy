require('dotenv').config() // puts .env variables to process.env

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
// ATLAS_URI = mongodb+srv://ginold:ginold@zdalniacy-q3pvs.gcp.mongodb.net/zdalniacy?retryWrites=true&w=majority
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection;
// once the connection is established...
db.openUri('once', () => {
    console.log('connectino to MONGODB established!')
})

app.use(cors())
app.use(express.json())

const jobsRouter = require('./routes/jobs');
app.use('/jobs', jobsRouter);
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/lessons', require('./routes/lessons'));

app.listen(port, () => {
    console.log(`server runnin at ${port}!`)
})