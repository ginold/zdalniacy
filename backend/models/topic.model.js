const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    type: { type: String, required: true }
})

const Topic = mongoose.model('Topic', topicSchema);
module.exports.model = Topic;
module.exports.schema = topicSchema;