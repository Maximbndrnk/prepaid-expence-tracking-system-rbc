const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// ROUTES
const authRoutes = require('./routes/auth');
const expensesRoutes = require('./routes/expenses');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);

module.exports = app;