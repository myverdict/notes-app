// this file only defines the Mongoose schema for notes
// whereas the mongoDB connection is moved to app.js file
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  // mongoose validation
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
