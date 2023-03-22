const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const api = require('./routes/index.js');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// // GET Rout for wildcard
// app.get('*', (req, res) => 
//     res.sendFile(path.join(__dirname, './public/index.html'))
// );


// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
