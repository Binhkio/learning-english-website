const lessonDao = require('../daos/lesson-dao');
const userDao = require('../daos/user-dao');
const _ = require('lodash');

const getQuizData = async (quiz) => {
    const lessons = await lessonDao.findLessonByArrayId(quiz.lessons);
    const creator = await userDao.findUserByCondition(quiz._doc.creator);
    if (_.isEmpty(lessons)) return { ...quiz._doc, lessons: null };
    return {
        ...quiz._doc,
        creator: creator,
        lessons: lessons,
    };
};

module.exports = {
    getQuizData
}
