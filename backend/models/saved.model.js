const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lesson = require('./lesson.model')
const job = require('./job.model')

const savedSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    jobs: [job.schema],
    lessons: [lesson.schema]
})

const Saved = mongoose.model('Saved', savedSchema);
module.exports.model = Saved;
module.exports.schema = savedSchema;