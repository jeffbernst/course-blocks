const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const { courseSchema } = require('./course')

const userSchema = new Schema({
  userName: String,
  userEmail: String,
  password: String,
  gravatarHash: String,
  enrolledIn: [
    {
      currentLesson: Number,
      currentPart: Number,
      completed: [[Number]],
      courseId: String
    }
  ],
  drafts: [courseSchema]
})

userSchema.methods.serialize = function() {
  return {
    userName: this.userName || '',
    userEmail: this.userEmail || '',
    id: this._id,
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
