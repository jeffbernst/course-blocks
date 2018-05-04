const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
  courseId: String,
  courseTitle: String,
  courseAuthor: String,
  themeColor: String,
  lessons: [
    {
      lessonTitle: String,
      parts: [
        {
          partTitle: String,
          partContent: String
        }
      ]
    }
  ]
})

const Course = mongoose.model('course', courseSchema)

module.exports = {courseSchema, Course}
