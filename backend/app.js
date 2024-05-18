const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
 
const dotenv = require("dotenv");
dotenv.config();
/*************22-04-2024******************/
//const session = require('express-session');
/*************22-04-2024******************/
//dotenv.config();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, XMLHttpRequest, ngsw-bypass, Lng, Lang');
    next();
  });

/*************22-04-2024******************/

//app.use(express.urlencoded({ extended: false }));// it enables your application to parse incoming URL-encoded form data and make it available in the req.body object in your route handlers.

/*************22-04-2024******************/

const database = process.env.MONGOLAB_URI;
mongoose.connect(database).then(() => console.log('connect')).catch(err => console.log(err));
app.set('view engine', 'ejs');
//Routes

/*************22-04-2024******************/

app.use(express.urlencoded({ extended: false }));

// app.use(session({
//     secret:'oneboy',
//     saveUninitialized: true,
//     resave: true
//   }));  

/*************22-04-2024**************************************************/

// Define a middleware to serve the dashboard page
app.use('/dashboard', (req, res, next) => {
    // Render your dashboard page with a logout button
    res.send('Dashboard Page - <button onclick="logout()">Logout</button>');
});

/*************22-04-2024*****************************************************/

// Assuming you have a route to handle logout
app.get('/logout', (req, res) => {
    // Handle logout logic
    // Redirect to login page or perform any other action
});

const indexRouter = require('./routes/index');
app.use('/', indexRouter);


// const createUser = require('./routes/users');
// app.use('/', createUser);

// const loginRoute = require('./routes/login');
// app.use('/', loginRoute);



const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT));

