// router middleware used to define related routes in a single place
const notesRouter = require('express').Router();
const Note = require('../models/note');

// notesRouter.get('/', (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

// with chaining promises
// notesRouter.get('/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// with try-catch clause and async/await
// notesRouter.get('/:id', async (request, response, next) => {
//   try {
//     const note = await Note.findById(request.params.id);
//     if (note) {
//       response.json(note);
//     } else {
//       response.status(404).end();
//     }
//   } catch (exception) {
//     next(exception);
//   }
// });

// no try-catch clause needed because of express-async-errors library
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// with chaining promises
// notesRouter.post('/', (request, response, next) => {
//   const body = request.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       response.status(201).json(savedNote);
//     })
//     .catch((error) => next(error));
// });

// with try-catch clause and async/await
// notesRouter.post('/', async (request, response, next) => {
//   const body = request.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   try {
//     const savedNote = await note.save();
//     response.status(201).json(savedNote);
//   } catch (exception) {
//     // The catch block calls the next fn, which passes the
//     // request handling to the error handling middleware.
//     next(exception);
//   }
// });

// no try-catch clause needed because of express-async-errors library
notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

// with chaining promises
// notesRouter.delete('/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// with try-catch clause and async/await
// notesRouter.delete('/:id', async (request, response, next) => {
//   try {
//     await Note.findByIdAndRemove(request.params.id);
//     response.status(204).end();
//   } catch (exception) {
//     next(exception);
//   }
// });

// no try-catch clause needed because of express-async-errors library
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// with chaining promises
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
