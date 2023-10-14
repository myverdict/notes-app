require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

// connect to the mongodb database
mongoose.connect(uri);

// define a schema for the note
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// the first "Note" parameter is the singular name of the model
const Note = mongoose.model('Note', noteSchema);

// create a new note object with the help of the "Note" model
// const note = new Note({
//   content: "HTML is Easy",
//   important: true,
// });

// const note = new Note({
//   content: "CSS is hard",
//   important: true,
// });

const note = new Note({
  content: 'Hulk is taking form',
  important: true,
});

// save the object to the database
note.save().then((result) => {
  console.log('note saved!');
  console.log(result);
  // close the database connection
  mongoose.connection.close();
});

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// Note.find({ important: true }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
