const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonTaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
})

const LessonTask = mongoose.model('LessonTask', LessonTaskSchema);
module.exports = LessonTask;