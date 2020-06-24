const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const addRoutes = require('./routes/add');
const homeRoutes = require('./routes/home');
const cardRouters = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const coursesRoutes = require('./routes/courses');
const User = require('./models/user');


const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5ef1078551d66d0e5165ec76'); 
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRouters);
app.use('/courses', coursesRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    const url = 'mongodb+srv://YraKot:wqDdN3RdFFCIB8Ot@cluster0-2vv7i.mongodb.net/app';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
   
    const candidate = await User.findOne()

    if(!candidate) {
      const user = new User({
        email: 'max@mail.com',
        name: 'Max',
        cart: {items: []}
      });
      await user.save();
    }
   
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();