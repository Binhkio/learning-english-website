const Lesson = require('../models/lesson');
const { ObjectId } = require('mongoose').Types;

const findLessonByCondition = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const lesson = await Lesson.findById(condition).exec();
    return lesson;
  }

  if (typeof condition === 'object' && condition !== null) {
    const lesson = await Lesson.find(condition)
    return lesson;
  }

  return null;
};

const insertData = async (condition) => {
  const lesson = await Lesson.create({
    name: condition.name,
    image: condition.image,
    status: condition.status,
  });
  return lesson;
}

const listLessonId = async () => {
  const lessonId = await Lesson.find({}, '_id')
  return lessonId
}

const findLessonByArrayId = async (ids) => {
  const lessonArr = await Lesson.find({_id: {$in: ids}})
  return lessonArr
}

const deleteLesson = async (condition) => {
  const result = await Lesson.findByIdAndDelete(condition)
  return result;
}

const editLesson = async (lesson, newValue) => {
  const result = await Lesson.findByIdAndUpdate(lesson._id, newValue);
  return result;
}

module.exports = {
  findLessonByCondition,
  insertData,
  deleteLesson,
  editLesson,
  listLessonId,
  findLessonByArrayId
}
