const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  // mongoose validation
  username: {
    type: String,
    required: true,
    unique: true, // this ensures the uniqueness of the username
    minLength: [4, '{VALUE}: must be minimum 4 characters long'],
    match: [
      /^[a-zA-Z]+$/,
      '{VALUE}: no numbers & no special characters allowed',
    ],
  },
  name: String,
  passwordHash: String,
  // ids of the notes are stored within the user document as an array of Mongo ids
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
