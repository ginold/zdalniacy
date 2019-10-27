const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lesson = require('./lesson.model')

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    lessonsNeeded: [lesson.schema]
}, {
    timestamps: true
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;