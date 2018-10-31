const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(morgan('short'));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'iwatchmylittlepony',
    resave: false,
    saveUninitialized: false
}))
require('./db/db');


app.get('/', (req, res)=>{
    res.render('index.ejs');
})

const artistsController = require('./controllers/artistsController');
const albumsController = require('./controllers/albumsController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/usersController');


app.use('/auth', authController);
app.use('/users', usersController);
app.use('/artists', artistsController);
app.use('/albums', albumsController);

app.listen(3001, ()=>{
    console.log("The server is at your service")
})