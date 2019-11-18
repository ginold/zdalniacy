const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsAppliedSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    jobId: { type: mongoose.Schema.Types.ObjectId },
})

const JobsApplied = mongoose.model('JobsApplied', jobsAppliedSchema);
module.exports = JobsApplied;