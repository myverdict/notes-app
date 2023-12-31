const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../app');
const Note = require('../models/note');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map((r) => r.content);

    expect(contents).toContain('Browser can execute only JavaScript');
  });

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(resultNote.body).toEqual(noteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe('addition of a new note', () => {
    let token = '';
    beforeAll(async () => {
      // delete all users at the beginning of the test
      await User.deleteMany({});

      // create and save a new user
      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({
        username: 'jarvis',
        name: 'Jarvis AI',
        passwordHash,
      });
      await user.save();

      // get login user token
      const loginUser = {
        username: 'jarvis',
        password: 'sekret',
      };
      const response = await api.post('/api/login').send(loginUser);
      token = response.body.token;
    });

    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      };

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();

      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

      const contents = notesAtEnd.map((n) => n.content);

      expect(contents).toContain('async/await simplifies making async calls');
    });

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true,
      };

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400);

      const notesAtEnd = await helper.notesInDb();

      expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
    });
  });

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();

      expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

      const contents = notesAtEnd.map((r) => r.content);

      expect(contents).not.toContain(noteToDelete.content);
    });
  });
});

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    // delete all users at the beginning of each test
    await User.deleteMany({});

    // create and save a new user
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'root',
      name: 'rootuser',
      passwordHash,
    });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);

    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe('user login and token generation', () => {
  beforeEach(async () => {
    // delete all users at the beginning of the test
    await User.deleteMany({});

    // create and save a new user
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'jarvis',
      name: 'Jarvis AI',
      passwordHash,
    });
    await user.save();
  });

  test('login success can log in with valid credentials and token generated', async () => {
    const loginUser = {
      username: 'jarvis',
      password: 'sekret',
    };

    const response = await api.post('/api/login').send(loginUser).expect(200);
    const token = response.body.token;

    expect(token).not.toBeUndefined();
  });

  test('login fails with status code 401, token undefined, and with error response if credentials are invalid', async () => {
    const loginUser = {
      username: 'jarvis',
      password: 'wrong',
    };

    const response = await api.post('/api/login').send(loginUser).expect(401);

    const token = response.body.token;

    expect(token).toBeUndefined();
    expect(response.body.error).toBe('invalid username or password');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
