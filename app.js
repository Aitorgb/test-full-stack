const express = require('express');
const path = require('path');

require('./config/hbs.config');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Configure routes
 */
const router = require('./config/routes.js');
app.use('/', router);

app.listen(3000, () => {
  console.log(`'My Dudyfit test running on port 3000 🏋️‍♀️ 🤼‍♂️ ⛹️‍♂️`);
});