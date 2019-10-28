const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: { type: String },
    subchapters: [{ type: String }]
})

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports.model = Chapter;
module.exports.schema = chapterSchema;