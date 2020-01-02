const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const ContentSchema = new Schema({
    order: String,
    commands: [String]
})

const Content = mongoose.model("Content",ContentSchema);

module.exports = Content;