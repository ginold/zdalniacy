const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    modelType: { type: String, default: 'course' },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lessson'
        }
    ]
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course

