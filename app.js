const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { json } = require('express');

// ROUTES
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();

const corsOptions = {
    credentials: true,
    origin: process.env.URL || '*',
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;