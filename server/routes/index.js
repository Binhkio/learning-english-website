const express = require('express');
const app = express();

// router
const authRouter = require('./auth')
const usersRouter = require('./user');
const adminRouter = require('./admin')
const lessonRouter = require('./lesson')

app.use('/user', usersRouter);
app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/lesson', lessonRouter)

module.exports = app
