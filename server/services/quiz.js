const _ = require('lodash')
const quizDao = require('../daos/quiz-dao')
const lessonDao = require('../daos/lesson-dao')
const userDao = require('../daos/user-dao')

const NEW_LESSON = 1
const OLD_LESSON = 0
const NEW_QUIZ = 0
const OLD_QUIZ = 0

const createQuiz = async (_id, param) => {
    if (_.isNil(param)) return { message: 'No data on request' }
    const quiz = await quizDao.findQuizByCondition(param.name)
    if (!_.isEmpty(quiz)) return { message: 'Quiz has been created. Please use another name'}

    let promiseInsertLessonData = []
    param.lessons.forEach((lesson) => {
        if(!_.isNil(lesson))
            promiseInsertLessonData.push(lessonDao.insertData({...lesson, status: NEW_LESSON}))
    })
    const insertLessonData = await Promise.all(promiseInsertLessonData)
    const lessonIds = insertLessonData.map((lesson) => lesson._id.toString())

    const insertQuizData = await quizDao.insertData({
        name: param.name,
        creator: _id.toString(),
        lessons: lessonIds,
        status: NEW_QUIZ,
    })

    return insertQuizData
}

const getQuiz = async (id) => {
    const quiz = await quizDao.findLessonByArrayId(id)
    if (_.isEmpty(quiz)) return { message: ' Can not find quiz' }
    return quiz
}

module.exports = {
    createQuiz,
    getQuiz
}
