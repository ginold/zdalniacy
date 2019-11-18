const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    familyname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    city: { type: String },
    country: { type: String },
    picture: { url: { type: String } },
    phonenumber: { type: String },
    userType: { type: String, required: true },
    points: { type: Number, default: 1000 },
    totalPoints: { type: Number },
    badge: { type: String },
    username: { type: String },
    unlockedLessons: [{ type: mongoose.Schema.Types.ObjectId }], // remove in future
    unlocked: { // keep this one
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: 'Lessson'
        }]
    },
    jobsApplied: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    saved: {
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: 'Lessson'
        }],
        jobs: [{
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }]
    },
    accomplished: {
        tasks: [{ type: mongoose.Schema.Types.ObjectId }],
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: 'Lesson'
        }]
    },
    interests: [{ type: String }],
    favoritePortals: [{ type: String }],
    jobExperience: [{ type: String }],
    hoursAvailable: [{ type: String }],
    features: [{ type: String }],
    workType: [{ type: String }],
    preferences: [{ type: Object }]
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema);
module.exports = User;