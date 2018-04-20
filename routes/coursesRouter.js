if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const {Course} = require('../models/course')
const {User} = require('../models/user')
const {jwtStrategy} = require('../strategies')

mongoose.Promise = global.Promise

passport.use(jwtStrategy)

const jwtAuth = passport.authenticate('jwt', {session: false})

// get request for all courses for index

// get request for specific course

async function publishCourse (course) {
  await Course.findOne({courseId: course.courseId}).remove()
  return await Course.create(course)
}

router.post('/', jwtAuth, async (req, res) => {
  try {
    const courseToPublish = {...req.body, courseAuthor: req.user.userName}
    const newCourse = await publishCourse(courseToPublish)
    res.send(newCourse)
  } catch (err) {
    console.error(err)
  }
})

router.get('/', async (req, res) => {
  const courses = await Course.find().limit(12)

  res.send(courses)
})

router.get('/:courseId', async (req, res) => {
  const course = await Course.findOne({courseId: req.params.courseId})

  res.send(course)
})

async function enrollInCourseAndUpdateUser (userId, courseId) {
  const enrolledInCourse = {
    courseId,
    currentLesson: 0,
    currentPart: 0,
    completed: [],
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {$push: {enrolledIn: enrolledInCourse}},
    {new: true}
  )

  return user
}

router.post('/:courseId', jwtAuth, async (req, res) => {
  try {
    const updatedUser = await enrollInCourseAndUpdateUser(req.user.id, req.params.courseId)
    res.send({
      enrolledIn: updatedUser.enrolledIn
    })
  } catch (err) {
    console.error(err)
  }
})

async function markPartCompleted(userId, userData) {
  const user = await User.findByIdAndUpdate(
    userId,
    userData,
    {new: true}
  )

  return user
}

router.put('/:courseId', jwtAuth, async(req, res) => {
  try {
    const updatedUser = await markPartCompleted(req.user.id, req.body)
    res.send({
      enrolledIn: updatedUser.enrolledIn
    })
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  router,
  publishCourse
}
