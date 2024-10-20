# Simple GRUD API

### Requirements

NodeJS >= 22.\*

### Install

1. Clone repository
2. Go to the project directory and run `npm i`
3. To run application use npm scripts:<br>
   `npm start:prod` - run build process and start production code<br>
   `npm run start:dev` - start in development mode<br>
   `npm run start:auto` - start in development mode + autorestart when source files have changed<br>

### Using

You can use application by sending HTTP-requests.<br>
Implemented endpoint api/users:

`GET api/users` is used to get all persons<br>
Server should answer with status code 200 and all users records

`GET api/users/{userId}`<br>
Server should answer with status code 200 and record with id === userId if it exists<br>
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)<br>
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

`POST api/users` is used to create record about new user and store it in database<br>
Server should answer with status code 201 and newly created record<br>
Server should answer with status code 400 and corresponding message if request body does not contain required fields

`PUT api/users/{userId}` is used to update existing user<br>
Server should answer with status code 200 and updated record<br>
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)<br>
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

`DELETE api/users/{userId}` is used to delete existing user from database<br>
Server should answer with status code 204 if the record is found and deleted<br>
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)<br>
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
