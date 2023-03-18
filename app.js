const express = require('express');
const authRoutes = require('./routes/auth');
const expensesRoutes = require('./routes/expenses');

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);

module.exports = app;