const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chapter = require('./chapter.model.js')
const lessonTask = require('./lessonTask.model.js')

const lessonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    chapters: [chapter.schema],
    courseType: { type: String },
    topics: [{ type: String }],
    tasks: [lessonTask.schema],
    type: { type: String }, // video, reading...
    duration: { type: Number },
    cost: { type: Number, required: true },
    points: { type: Number }
})

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports.model = Lesson;
module.exports.schema = lessonSchema;