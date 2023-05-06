const express = require('express');
const app = express();

// router
const authRouter = require('./auth');
const usersRouter = require('./user');
const adminRouter = require('./admin');
const lessonRouter = require('./lesson');
const quizRouter = require('./quiz');

app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/lesson', lessonRouter);
app.use('/quiz', quizRouter);

module.exports = app;
