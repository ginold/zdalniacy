const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
})

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports.model = Chapter;
module.exports.schema = chapterSchema;