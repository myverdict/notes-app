require('dotenv').config();
const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

// const uri = process.env.MONGODB_URI;
// const password = process.argv[2];

const uri = process.env.TEST_MONGODB_URI;

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
//   content: 'Browser can execute only JavaScript',
//   important: true,
// });

const note = new Note({
  content: 'POST is used to add data to a REST API',
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
