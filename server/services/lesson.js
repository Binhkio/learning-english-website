const lessonDao = require('../daos/lesson-dao')
const _ = require('lodash')
const userDao = require('../daos/user-dao')

const NEW_LESSON = 1
const OLD_LESSON = 0

const insertLessons = async (_id, param) => {
    const lesson = await lessonDao.findLessonByCondition(param)
    const user = await userDao.findUserByCondition(_id)
    if (!_.isEmpty(lesson) && user.lessons.includes(lesson[0]._id.toString())) return { message: 'Lesson has been created. Please use another name'}

    const insertLessonData = await lessonDao.insertData({ ...param, status: NEW_LESSON })

    const listLessonObject = await lessonDao.listLessonId()
    const ids = listLessonObject.map(item => item._id.toString());
    const responseAddLessonToUser = await userDao.addLessonToUser(_id, ids)

    if (responseAddLessonToUser.modifiedCount < 0)
        return { message: 'Error' }

    return insertLessonData
}

const getLesson = async (id) => {
    const lesson = await lessonDao.findLessonByArrayId(id)
    if (_.isEmpty(lesson)) return { message: ' Can not find lesson' }
    return lesson
}

module.exports = {
    insertLessons,
    getLesson
}
