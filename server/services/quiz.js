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

const updateQuiz = async (user_id, _id, name, lessons, status) => {
    const quiz = await quizDao.findQuizByCondition(_id)
    if (_.isEmpty(quiz)) return { message: 'Quiz not found. Please create a new one'}

    const newValue = {
        status: NEW_QUIZ
    }
    if(!_.isNil(name)){
        newValue.name = name
    }
    if(!_.isNil(status)){
        newValue.status = status
    }
    if(!_.isNil(lessons)){
        let promiseInsertLessonData = []
        lessons.forEach(async (lesson) => {
            if(_.isNil(lesson)) return;
            if(!_.isNil(lesson._id)) {
                promiseInsertLessonData.push(lessonDao.editLesson({_id:lesson._id}, {...lesson, status: NEW_LESSON}))
            }else{
                promiseInsertLessonData.push(lessonDao.insertData({...lesson, status: NEW_LESSON}))
            }
        })
        const insertLessonData = await Promise.all(promiseInsertLessonData)
        newValue.lessons = insertLessonData.map((lesson) => lesson._id.toString())
    }

    console.log('status', newValue.status);
    const insertQuizData = await quizDao.editQuiz(_id, {
        ...newValue,
        creator: user_id.toString(),
    })

    return insertQuizData
}

const getAllQuizzes = async () => {
    const quizzes = await quizDao.getAllQuizzes()
    if (_.isEmpty(quizzes)) return { message: 'No quiz availble' }
    const verifyQuizzesPromise = quizzes.map(async (quiz) => {
        const lessons = await lessonDao.findLessonByArrayId(quiz.lessons)
        const creator = await userDao.findUserByCondition(quiz._doc.creator)
        if (_.isEmpty(lessons)) return {...quiz._doc, lessons: null}
        return {
            ...quiz._doc,
            creator: creator,
            lessons: lessons,
        }
    }).filter(quiz => !_.isNull(quiz.lessons))
    const verifyQuizzes = await Promise.all(verifyQuizzesPromise)
    return verifyQuizzes
}

const getQuiz = async (id) => {
    const quiz = await quizDao.findLessonByArrayId(id)
    if (_.isEmpty(quiz)) return { message: ' Can not find quiz' }
    return quiz
}

const getOneQuiz = async (id) => {
    const quiz = await quizDao.findQuizByCondition(id)
    if (_.isEmpty(quiz)) return { message: ' Can not find quiz' }
    const lessons = await lessonDao.findLessonByArrayId(quiz.lessons)
    const creator = await userDao.findUserByCondition(quiz._doc.creator)
    if (_.isEmpty(lessons)) return {...quiz._doc, lessons: null}
    return {
        ...quiz._doc,
        creator: creator,
        lessons: lessons,
    }
}

const deleteQuiz = async (id) => {
    const result = await quizDao.deleteQuiz(id)
    return result
}

module.exports = {
    createQuiz,
    getQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
    getOneQuiz,
}
