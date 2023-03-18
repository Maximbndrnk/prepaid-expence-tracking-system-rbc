const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const expensesRoutes = require('./routes/expenses');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);

module.exports = app;