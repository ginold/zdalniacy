const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unlockedLessonSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId }]
})

const UnlockedLesson = mongoose.model('UnlockedLessons', unlockedLessonSchema);
module.exports.model = UnlockedLesson;
module.exports.schema = unlockedLessonSchema;