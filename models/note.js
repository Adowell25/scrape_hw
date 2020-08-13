var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  articleId: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;