const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    chapters: [{
        title: { type: String },
        subchapters: [{ type: String }]
    }],
    courseType: { type: String },
    topics: [{ type: String }],
    tasks: [{
        title: { type: String, required: true },
        description: { type: String, required: true }
    }],
    type: { type: String }, // video, reading...
    duration: { type: Number },
    cost: { type: Number, required: true },
    points: { type: Number },
    schemaType: { type: String },
    reward: { type: Number },
    modelType: { type: String, default: 'lesson' }
})

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson