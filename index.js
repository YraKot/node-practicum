const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const cardRouters = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const { use } = require('./routes/home');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static( path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRouters);
app.use('/courses', coursesRoutes);

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});