# uoh-fullstack-open-2023-part3

## Notes application - University of Helsinki (Deep Dive Into Modern Web Development, Part 3: Programming a server with NodeJS and Express)

Install dependencies from the root of the project/application:

```
npm i
```

To run the application, in the terminal run the below command:

- For practice purposes:

```
node mongo.js yourPassword
```

- Actual notes application

```
npm run dev
```

On the browser, visit for get requests for get requests:

- http://localhost:3001/
- http://localhost:3001/api/notes
- http://localhost:3001/api/notes/1

You can also perform these operations on Postman/VS Code REST client.

REST HTTP Methods for the notes application:

| URL          | verb   | functionality                                                 |
| ------------ | ------ | ------------------------------------------------------------- |
| api/notes    | GET    | fetches all resources in the collection                       |
| api/notes/1  | GET    | fetches a single resource                                     |
| api/notes    | POST   | creates a new resource based on the request data              |
| api/notes/1  | PUT    | replaces the entire identified resource with the request data |
| /api/notes/1 | DELETE | removes the identified resource                               |

---

### Part 3 - (d) Validation and ESLint

Practice - Note application: backend express server app (contd. from Part 3c)

NOTE: when running the notes app frontend, make sure the notes app backend server is also running, else the app will not work

#### Requirements for the application:

1. Express - Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js

```
npm install express
```

2. Nodemon - reload, automatically

```
npm install --save-dev nodemon
```

3. CORS

```
npm install cors
```

4. Deployed on [render](https://render.com/) - Cloud Application Hosting for Developers

https://notes-app-3bjn.onrender.com

When the app is deployed in Render, make sure that the env variables from this project is saved in the Render web service --> Environment

5. MongoDB Atlas - A MongoDB provider. Create an account (here)[https://www.mongodb.com/atlas/database] and choose the free option. (MongoDB is a document-oriented NoSQL database)

6. Mongoose - Object Document Mapper library for MongoDB

```
npm install mongoose
```

7. dotenv - used for environment variables

```
npm install dotenv
```
