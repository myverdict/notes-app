require('dotenv').config();
const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

// const password = process.argv[2];

const uri = process.env.TEST_MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'Browser can execute only JavaScript',
//   important: true,
// });

const note = new Note({
  content: 'POST is used to add data to a REST API',
  important: true,
});

note.save().then((result) => {
  console.log('note saved!');
  mongoose.connection.close();
});

/*
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/
