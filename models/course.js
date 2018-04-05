const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
  courseId: String,
  courseTitle: String,
  authorId: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  themeColor: String,
  tags: [String],
  courseSummary: String,
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

module.exports = { courseSchema, Course }
