const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

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

// GET Route for retrieving all the notes saved in db.json
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
