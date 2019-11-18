const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TOPICS = ['ux/ui', 'programming', 'design', 'backend', 'fron-tend', 'adobe', 'javascript']
const INTERESTS = ['advertisment', 'film', 'computer_science', 'foreign_languages']

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    requirements: { type: String },
    modelType: { type: String, default: 'job' },
    lessonsNeeded: [{
        type: Schema.Types.ObjectId,
        ref: 'Lessson'
    }],
    tags: [{
        type: String,
        enum: TOPICS.concat(INTERESTS)
    }]
}, {
    timestamps: true
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;