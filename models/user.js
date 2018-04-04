const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { courseSchema } = require('./course')

const userSchema = new Schema({
  userId: String,
  userName: String,
  gravatarHash: String,
  enrolledIn: [
    {
      currentLesson: Number,
      currentPart: Number,
      completed: [[Number]],
      // should courseData be linked from courses database?
      courseData: courseSchema
    }
  ],
  drafts: [courseSchema]
})

export const User = mongoose.model('user', userSchema)
