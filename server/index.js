const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const config = require('dotenv').config()

//Helpers
const apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));

const movieRoutes = require('./routes/movieRoutes.js');
app.use('/movies', movieRoutes);

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});
