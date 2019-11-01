const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const job = require('./job.model')
const saved = require('./saved.model')

const userSchema = new Schema({
    familyname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    city: { type: String },
    country: { type: String },
    picture: { type: String },
    phonenumber: { type: String },
    userType: { type: String, required: true },
    points: { type: Number },
    jobsApplied: [job.schema],
    savedObjects: [saved.schema],
    interests: [{ type: String }],
    preferences: [{ type: Object }]
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema);
module.exports = User;