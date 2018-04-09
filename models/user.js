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
      // TODO should courseData be linked from courses database?
      courseData: courseSchema
    }
  ],
  drafts: [courseSchema]
})

userSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  }
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10)
}

const User = mongoose.model('user', userSchema)

module.exports = { User }
