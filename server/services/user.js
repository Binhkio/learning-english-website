const userDao = require('../daos/user-dao');
const quizDao = require('../daos/quiz-dao');
const lessonDao = require('../daos/lesson-dao');
const _ = require('lodash');
const authSecurity = require('./auth');
const bcrypt = require('bcrypt');
const constants = require('../utils/constants');
const CustomApiMessage = require('../errors/CustomApiMessage');
const httpCode = require('../utils/httpCode');

const getCurrentUser = async (id) => {
    const user = await userDao.findUserByCondition({ _id: id });

    if (_.isNil(user)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User is not in the database');

    const { email, _id, role } = user;
    const jsonToken = await authSecurity.generateAccessToken(email, _id.toString(), role);
    let response = { user, jsonToken };
    return response;
};

const updateQuizToUser = async (_id, ids) => {
    const user = await userDao.findUserByCondition(_id);
    if (_.isNil(user)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User is not in the database');

    const quizzes = await quizDao.findLessonByArrayId(ids);
    const quizIds = quizzes.filter((quiz) => !_.isNil(quiz)).map((quiz) => quiz._id.toString());
    const response = await userDao.updateQuizToUser(_id, quizIds);
    return response;
};

const updateLessonToUser = async (_id, ids) => {
    const user = await userDao.findUserByCondition(_id);
    if (_.isNil(user)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User is not in the database');

    const lessons = await lessonDao.findLessonByArrayId(ids);
    const lessonIds = lessons.filter((lesson) => !_.isNil(lesson)).map((lesson) => lesson._id.toString());
    const response = await userDao.updateLessonToUser(_id, lessonIds);
    return response;
};

const changePassword = async (_id, data) => {
    const user = await userDao.findUserByCondition(_id);
    if (_.isNil(user)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User is not in the database');

    const passwordCompare = await bcrypt.compare(data.oldPassword, user.password);
    if (!passwordCompare) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User or password wrong');

    const newPassword = await bcrypt.hash(data.newPassword, constants.SALT_ROUNDS);

    const params = {
        data: {
            password: newPassword,
        },
    };

    const response = await userDao.editUser(user, params.data);
    return { message: 'Update success' };
};

module.exports = {
    getCurrentUser,
    updateQuizToUser,
    updateLessonToUser,
    changePassword,
};
