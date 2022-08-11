const express = require('express')
require('dotenv').config();

const app = express()
const port = process.env.PORT || 30;
const path = require('path');
const expressLayout = require('express-ejs-layouts');

// view engine setup
app.use(expressLayout);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})