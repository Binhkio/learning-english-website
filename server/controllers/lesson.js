const lessonService = require('../services/lesson')
const _ = require('lodash')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')

const storeLessons = async (request, response) => {
    const { _id, data } = request.body
    const payload = await lessonService.insertLessons( _id, data)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const getLesson = async (request, response) => {
    const { ids } = request.body
    const payload = await lessonService.getLesson(ids)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

module.exports = {
    storeLessons,
    getLesson
}
