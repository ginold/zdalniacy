const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lesson = require('./lesson.model')

const courseSchema = new Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    lessons: [lesson.schema]
})

const Course = mongoose.model('Course', courseSchema);
module.exports = {
    model: Course,
    schema: courseSchema
};