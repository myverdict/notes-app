# Notes application - University of Helsinki (Deep Dive Into Modern Web Development, Part 4: Testing Express servers, user administration)

Install dependencies from the root of the project/application:

```bash
npm i
```

To run the application, in the terminal run the below command:

- For practice purposes:

```bash
node mongo.js yourPassword
```

or

```bash
node mongo.js
```

- Actual notes application

```bash
npm run dev
```

To run tests:

- To run all tests

```bash
npm test
```

or

```bash
npm run test
```

- To run an individual test file:

```bash
npm test -- tests/note_api.test.js
```

- To run ONE test with a specific name (can be a test name or the describe block):

```bash
npm test -- -t "a specific note is within the returned notes"
```

- To run tests that contains the word 'notes' in their name:

```bash
npm test -- -t 'notes'
```

Linting:

```bash
npm run lint
```

On the browser, visit for get requests for get requests:

- http://localhost:3001/
- http://localhost:3001/api/notes
- http://localhost:3001/api/notes/1

You can also perform these operations on Postman/VS Code REST client.

REST HTTP Methods for the notes application:

| URL              | verb   | functionality                                                 |
| ---------------- | ------ | ------------------------------------------------------------- |
| NOTES Collection |
| api/notes        | GET    | fetches all resources in the collection                       |
| api/notes/1      | GET    | fetches a single resource                                     |
| api/notes        | POST   | creates a new resource based on the request data              |
| api/notes/1      | PUT    | replaces the entire identified resource with the request data |
| api/notes/1      | DELETE | removes the identified resource                               |
| USERS Collection |
| api/users        | GET    | fetches all resources in the collection                       |
| api/users        | POST   | creates a new resource based on the request data              |

---

## Part 4 - (c) User administration

Practice - Note application: backend express server app (contd. from Part 4b)

NOTE: when running the notes app frontend, make sure the notes app backend server is also running, else the app will not work

### Requirements for the application:

1. Express - Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js

```bash
npm install express
```

2. Nodemon - reload, automatically

```bash
npm install --save-dev nodemon
```

3. CORS middleware (Cross-Origin Resource Sharing)

```bash
npm install cors
```

4. Deployed on [render](https://render.com/) - Cloud Application Hosting for Developers

https://notes-app-3bjn.onrender.com

When the app is deployed in Render, make sure that the env variables from this project is saved in the Render web service --> Environment

5. MongoDB Atlas - A MongoDB provider. Create an account (here)[https://www.mongodb.com/atlas/database] and choose the free option. (MongoDB is a document-oriented NoSQL database)

6. Mongoose - Object Document Mapper library for MongoDB

```bash
npm install mongoose
```

7. dotenv - used for environment variables

```bash
npm install dotenv
```

8. ESLint - tool for static analysis (aka "linting") that detects and flags errors in programming languages, including stylistic errors

```bash
npm install eslint --save-dev
```

To initialize a default ESlint configuration:

```bash
npx eslint --init
```

or

```bash
npm init @eslint/config
```

9. Jest - testing library

```bash
npm install --save-dev jest
```

10. cross-env (Runs scripts that set and use environment variables across platforms) - Install cross-env as a production dependency.

```bash
npm install cross-env
```

11. supertest - write tests for testing the API

```bash
npm install --save-dev supertest
```

12. express-async-errors (A dead simple ES6 async/await support hack for ExpressJS)

```bash
npm install express-async-errors
```

13. bcrypt - generates password hashes

```bash
npm install bcrypt
```

14. mongoose-unique-validator (for checking the uniqueness of a field)

```bash
npm install mongoose-unique-validator
```
