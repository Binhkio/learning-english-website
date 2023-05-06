const _ = require('lodash');
const quizDao = require('../daos/quiz-dao');
const lessonDao = require('../daos/lesson-dao');
const userDao = require('../daos/user-dao');
const CustomApiMessage = require('../errors/CustomApiMessage');
const httpCode = require('../utils/httpCode');
const quizHelper = require('../helpers/quizHelper');

const NEW_LESSON = 1;
const OLD_LESSON = 0;
const NEW_QUIZ = 0;
const OLD_QUIZ = 0;

const createQuiz = async (_id, param) => {
    if (_.isNil(param)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'No data on request');
    const quiz = await quizDao.findQuizByCondition(param.name);
    if (!_.isEmpty(quiz)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Quiz has been created. Please use another name');

    let promiseInsertLessonData = [];
    param.lessons.forEach((lesson) => {
        if (!_.isNil(lesson)) promiseInsertLessonData.push(lessonDao.insertData({ ...lesson, status: NEW_LESSON }));
    });
    const insertLessonData = await Promise.all(promiseInsertLessonData);
    const lessonIds = insertLessonData.map((lesson) => lesson._id.toString());

    const quizData = {
        name: param.name,
        creator: _id.toString(),
        lessons: lessonIds,
        status: NEW_QUIZ,
    };

    return await quizDao.insertData(quizData);
};

const updateQuiz = async (user_id, _id, name, lessons, status) => {
    const quiz = await quizDao.findQuizByCondition(_id);
    if (_.isEmpty(quiz)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Quiz not found. Please create a new one');

    let newValue = {
        status: NEW_QUIZ,
    };
    if (!_.isNil(name)) {
        newValue.name = name;
    }
    if (!_.isNil(status)) {
        newValue.status = status;
    }
    if (!_.isNil(lessons)) {
        let promiseInsertLessonData = [];
        lessons.forEach(async (lesson) => {
            if (_.isNil(lesson)) return;
            if (!_.isNil(lesson._id)) {
                promiseInsertLessonData.push(lessonDao.editLesson({ _id: lesson._id }, { ...lesson, status: NEW_LESSON }));
            } else {
                promiseInsertLessonData.push(lessonDao.insertData({ ...lesson, status: NEW_LESSON }));
            }
        });
        const insertLessonData = await Promise.all(promiseInsertLessonData);
        newValue.lessons = insertLessonData.map((lesson) => lesson._id.toString());
    }

    const insertQuizData = await quizDao.editQuiz(_id, {
        ...newValue,
        creator: user_id.toString(),
    });

    return insertQuizData;
};

const getAllQuizzes = async () => {
    const quizzes = await quizDao.getAllQuizzes();
    if (_.isEmpty(quizzes)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'No quiz availble');
    const verifyQuizzesPromise = quizzes
        .map(async (quiz) => {
            return await quizHelper.getQuizData(quiz);
        })
        .filter((quiz) => !_.isNull(quiz.lessons));
    const verifyQuizzes = await Promise.all(verifyQuizzesPromise);
    return verifyQuizzes;
};

const getQuizzes = async (id) => {
    const quiz = await quizDao.findLessonByArrayId(id);
    if (_.isEmpty(quiz)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Can not find quiz');
    return quiz;
};

const getOneQuiz = async (id) => {
    const quiz = await quizDao.findQuizByCondition(id);
    if (_.isEmpty(quiz)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Can not find quiz');
    return await quizHelper.getQuizData(quiz);
};

const deleteQuiz = async (id) => {
    const result = await quizDao.deleteQuiz(id);
    return result;
};

module.exports = {
    createQuiz,
    getQuizzes,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
    getOneQuiz,
};
