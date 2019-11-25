const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    type: { type: String, required: true }, // quizz, homework, writing...
    questions: [{ // only quizz
        title: { type: String },
        type: { type: String },
        answers: [{
            text: { type: String },
            value: { type: String },
        }],
        correctAnswers: [{ type: String }]
    }],
    tasks: [{ // only homework or writing
        title: { type: String },
        description: { type: String },
        imgUrl: { type: String }
    }],
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lessson' },
}
    , {
        timestamps: true
    })

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;