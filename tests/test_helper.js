const Note = require('../models/note');

// array containing the initial database state
const initialNotes = [
  {
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    content: 'POST is used to add data to a REST API',
    important: true,
  },
];

// used for creating a database object ID that does
// not belong to any note object in the database
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

// used for checking the notes stored in the database
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
