const _ = require('lodash')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')
const QuizService = require('../services/quiz')

const createQuiz = async (request, response) => {
    const { _id, data } = request.body
    const payload = await QuizService.createQuiz(_id, data)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const updateQuiz = async (request, response) => {
    const { user_id, _id, name, lessons, status } = request.body
    const payload = await QuizService.updateQuiz(user_id, _id, name, lessons, status)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const getQuiz = async (request, response) => {
    const { ids } = request.body
    const payload = await QuizService.getQuiz(ids)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const getOneQuiz = async (request, response) => {
    const { _id } = request.body
    const payload = await QuizService.getOneQuiz(_id)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const deleteQuiz = async (request, response) => {
    const { _id } = request.body
    const payload = await QuizService.deleteQuiz(_id)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const getAllQuizzes = async (request, response) => {
    const payload = await QuizService.getAllQuizzes()
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

module.exports = {
    createQuiz,
    getQuiz,
    getOneQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
}
