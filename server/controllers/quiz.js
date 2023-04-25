const _ = require('lodash')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')
const QuizService = require('../services/quiz')

const createQuiz = async (request, response) => {
    const { _id, data } = request.body
    const payload = await QuizService.createQuiz(_id, data)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const getQuiz = async (request, response) => {
    const { ids } = request.body
    const payload = await QuizService.getQuiz(ids)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

module.exports = {
    createQuiz,
    getQuiz
}
