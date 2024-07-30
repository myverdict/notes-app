// the event handlers of routes are commonly referred to as controllers

// create a new router object
const notesRouter = require('express').Router();
const User = require('../models/user');
const Note = require('../models/note');
const jwt = require('jsonwebtoken');

// without async/await
// notesRouter.get('/', (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// with async/await
notesRouter.get('/', async (request, response) => {
  // const notes = await Note.find({});
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

//without async/await
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

// with async/await & try/catch
// notesRouter.get('/:id', async (request, response, next) => {
//   try {
//     const note = await Note.findById(request.params.id);

//     if (note) {
//       response.json(note);
//     } else {
//       response.status(404).end();
//     }
//   } catch(exception) {
//     next(exception);
//   };
// });

// with async/await & without try/catch (after adding the 'express-async-errors' library)
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// without async/await
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

// with async/await & try/catch
// notesRouter.post('/', async (request, response, next) => {
//   const body = request.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   try {
//     const savedNote = await note.save();
//     response.status(201).json(savedNote);
//   } catch(exception) {
//     next(exception);
//   };
// });

// this helper function isolates the token from the authorization header
const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

// with async/await & without try/catch (after adding the 'express-async-errors' library)
notesRouter.post('/', async (request, response) => {
  const body = request.body;

  // validity of the token is checked with jwt.verify
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
  // console.log(user);
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  // the note id is stored in the 'notes' field of the user object
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

// without async/await
// notesRouter.delete('/:id', (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// with async/await & try/catch
// notesRouter.delete('/:id', async (request, response, next) => {
//   try {
//     await Note.findByIdAndDelete(request.params.id);
//     response.status(204).end();
//   } catch(exception) {
//     next(exception);
//   };
// });

// with async/await & without try/catch (after adding the 'express-async-errors' library)
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

// without async/await
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// with async/await & try/catch


// with async/await & without try/catch (after adding the 'express-async-errors' library)


// export the router to be available for all consumers of the module
module.exports = notesRouter;
