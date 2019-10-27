const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chapter = require('./chapter.model.js')
const topic = require('./topic.model.js')

const lessonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    chapters: [chapter.schema],
    courseType: { type: String },
    topics: [{ type: String }],
    type: { type: String }, // video, reading...
    duration: { type: Number }
})

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports.model = Lesson;
module.exports.schema = lessonSchema;